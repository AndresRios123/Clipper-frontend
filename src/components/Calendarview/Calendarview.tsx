import { useState, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight, Plus, X, Move } from "lucide-react";

// ---------- Tipos ----------
type AppointmentColor = "green" | "blue" | "orange";

type Appointment = {
  id: string;
  clientName: string;
  startHour: number; // hora de inicio en formato 24h (8 = 8am, 13 = 1pm)
  endHour: number; // hora de fin en formato 24h
  color: AppointmentColor;
};

type DayColumn = {
  label: string; // "Lun", "Mar", etc.
  date: Date;
  appointments: Appointment[];
};

// ---------- Configuración del grid ----------
const START_HOUR = 8; // 8:00
const END_HOUR = 18; // 6:00 pm
const hours = Array.from(
  { length: END_HOUR - START_HOUR + 1 },
  (_, i) => START_HOUR + i
);

const DAY_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// Mes/año donde mostramos datos de ejemplo. Fuera de este mes, el calendario
// se muestra vacío (ajusta esto cuando conectes datos reales de una API).
const DEMO_MONTH = 4; // Mayo (0-indexado: 0 = Enero)
const DEMO_YEAR = 2026;

const formatHourLabel = (hour: number) => {
  const display = hour > 12 ? hour - 12 : hour;
  return `${display}:00`;
};

const formatHourRangeLabel = (hour: number) => {
  const period = (h: number) => (h >= 12 ? "pm" : "am");
  const display = (h: number) => (h > 12 ? h - 12 : h === 0 ? 12 : h);
  return `${display(hour)}:00 ${period(hour)} - ${display(hour + 1)}:00 ${period(
    hour + 1
  )}`;
};

// Devuelve el lunes de la semana a la que pertenece `date`
const getMondayOfWeek = (date: Date) => {
  const result = new Date(date);
  const day = result.getDay(); // 0 = domingo, 1 = lunes, ...
  const diff = day === 0 ? -6 : 1 - day;
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
};

// Generador pseudo-aleatorio determinista a partir de una semilla (string).
// Así, la misma semana siempre genera las mismas citas de ejemplo,
// sin que cambien en cada render o al mover el mouse.
const seededRandom = (seed: string) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), h | 1);
    h ^= h + Math.imul(h ^ (h >>> 7), h | 61);
    return ((h ^ (h >>> 14)) >>> 0) / 4294967296;
  };
};

const SAMPLE_NAMES = [
  "Carlos M.",
  "Lucía S.",
  "Cristian G.",
  "María L.",
  "Andrés R.",
  "Diego L.",
  "Sofía P.",
  "Javier T.",
];
const SAMPLE_COLORS: AppointmentColor[] = ["green", "blue", "orange"];

// Genera entre 0 y 3 citas aleatorias (pero deterministas) para un día dado
const generateAppointmentsForDay = (date: Date): Appointment[] => {
  const seed = date.toISOString().slice(0, 10); // ej. "2026-05-20"
  const random = seededRandom(seed);

  const appointmentCount = Math.floor(random() * 4); // 0 a 3 citas
  const appointments: Appointment[] = [];
  const occupiedHours = new Set<number>();

  for (let i = 0; i < appointmentCount; i++) {
    const duration = 1 + Math.floor(random() * 3); // 1 a 3 horas
    const maxStart = END_HOUR - duration;
    const startHour =
      START_HOUR + Math.floor(random() * (maxStart - START_HOUR + 1));

    // Evitar que se solapen con una cita ya generada ese día
    const range = Array.from({ length: duration }, (_, i) => startHour + i);
    const overlaps = range.some((h) => occupiedHours.has(h));
    if (overlaps) continue;
    range.forEach((h) => occupiedHours.add(h));

    appointments.push({
      id: `${seed}-${i}`,
      clientName: SAMPLE_NAMES[Math.floor(random() * SAMPLE_NAMES.length)],
      startHour,
      endHour: startHour + duration,
      color: SAMPLE_COLORS[Math.floor(random() * SAMPLE_COLORS.length)],
    });
  }

  return appointments;
};

const isInDemoMonth = (date: Date) =>
  date.getMonth() === DEMO_MONTH && date.getFullYear() === DEMO_YEAR;

// Construye los 7 días de la semana a partir del lunes dado
const buildWeek = (monday: Date): DayColumn[] => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    return {
      label: DAY_LABELS[i],
      date,
      appointments: isInDemoMonth(date) ? generateAppointmentsForDay(date) : [],
    };
  });
};

// ---------- Estilos por color ----------
const colorStyles: Record<AppointmentColor, { bg: string; text: string }> = {
  green: { bg: "#A9CCAA", text: "#166327" },
  blue: { bg: "#97A7E5", text: "#143CD1" },
  orange: { bg: "#F5C5A6", text: "#B15115" },
};

const ROW_HEIGHT = 40; // alto en px de cada fila de 1 hora

type CreateModalState = {
  open: boolean;
  dayIndex: number;
  hour: number;
};

// Etiqueta del header: muestra el mes (y año) considerando que la semana
// puede cruzar dos meses distintos
const getHeaderLabel = (days: DayColumn[]) => {
  const firstMonth = days[0].date.getMonth();
  const lastMonth = days[6].date.getMonth();
  const year = days[0].date.getFullYear();

  if (firstMonth === lastMonth) {
    return `${MONTH_NAMES[firstMonth]} ${year}`;
  }
  // La semana cruza dos meses: mostramos ambos, ej. "Abril / Mayo 2026"
  const lastYear = days[6].date.getFullYear();
  return `${MONTH_NAMES[firstMonth]} / ${MONTH_NAMES[lastMonth]} ${lastYear}`;
};

type ConfirmMoveState = {
  appt: Appointment;
  fromDayIndex: number;
  fromHour: number;
  toDayIndex: number;
  toHour: number;
};

const CalendarView = () => {
  const [currentMonday, setCurrentMonday] = useState(() =>
    getMondayOfWeek(new Date(2026, 4, 20))
  );
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [animationKey, setAnimationKey] = useState(0);
  const [hoveredDayHour, setHoveredDayHour] = useState<{ dayIndex: number; hour: number } | null>(null);
  const [hoveredApptId, setHoveredApptId] = useState<string | null>(null);
  const [createModal, setCreateModal] = useState<CreateModalState>({ open: false, dayIndex: 0, hour: 8 });
  const [confirmMove, setConfirmMove] = useState<ConfirmMoveState | null>(null);
  const [daysState, setDaysState] = useState<DayColumn[]>(() => buildWeek(getMondayOfWeek(new Date(2026, 4, 20))));
  const dragRef = useRef<{ dayIndex: number; apptId: string } | null>(null);

  const headerLabel = useMemo(() => getHeaderLabel(daysState), [daysState]);

  const goToPreviousWeek = () => {
    const prev = new Date(currentMonday);
    prev.setDate(prev.getDate() - 7);
    setDirection("backward");
    setCurrentMonday(prev);
    setDaysState(buildWeek(prev));
    setAnimationKey((k) => k + 1);
  };

  const goToNextWeek = () => {
    const next = new Date(currentMonday);
    next.setDate(next.getDate() + 7);
    setDirection("forward");
    setCurrentMonday(next);
    setDaysState(buildWeek(next));
    setAnimationKey((k) => k + 1);
  };

  const deleteAppointment = (dayIndex: number, apptId: string) => {
    setDaysState((prev) => {
      const next = prev.map((day, i) => {
        if (i !== dayIndex) return day;
        return { ...day, appointments: day.appointments.filter((a) => a.id !== apptId) };
      });
      return next;
    });
  };

  const moveAppointment = (apptId: string, fromDayIndex: number, toDayIndex: number, toHour: number) => {
    setDaysState((prev) => {
      let apptToMove: Appointment | null = null;
      const next = prev.map((day, i) => {
        if (i === fromDayIndex) {
          const filtered = day.appointments.filter((a) => a.id !== apptId);
          apptToMove = day.appointments.find((a) => a.id === apptId) || null;
          return { ...day, appointments: filtered };
        }
        return day;
      });
      if (apptToMove) {
        const duration = apptToMove.endHour - apptToMove.startHour;
        next[toDayIndex] = {
          ...next[toDayIndex],
          appointments: [
            ...next[toDayIndex].appointments,
            { ...apptToMove, startHour: toHour, endHour: toHour + duration },
          ],
        };
      }
      return next;
    });
    setConfirmMove(null);
  };

  const handleDragStart = (e: React.DragEvent, dayIndex: number, apptId: string) => {
    dragRef.current = { dayIndex, apptId };
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", apptId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, toDayIndex: number, toHour: number) => {
    e.preventDefault();
    const dragData = dragRef.current;
    if (!dragData) return;

    const appt = daysState[dragData.dayIndex]?.appointments.find(
      (a) => a.id === dragData.apptId
    );
    if (!appt) return;

    const isSamePosition =
      dragData.dayIndex === toDayIndex && appt.startHour === toHour;
    if (isSamePosition) return;

    setConfirmMove({
      appt,
      fromDayIndex: dragData.dayIndex,
      fromHour: appt.startHour,
      toDayIndex,
      toHour,
    });
    dragRef.current = null;
  };

  const addAppointment = (dayIndex: number, hour: number, clientName: string) => {
    const colors: AppointmentColor[] = ["green", "blue", "orange"];
    const newAppt: Appointment = {
      id: `manual-${Date.now()}`,
      clientName,
      startHour: hour,
      endHour: hour + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setDaysState((prev) => {
      const next = prev.map((day, i) => {
        if (i !== dayIndex) return day;
        return { ...day, appointments: [...day.appointments, newAppt] };
      });
      return next;
    });
    setCreateModal({ open: false, dayIndex: 0, hour: 8 });
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6 relative">
      {/* Header: título + navegación de semana */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Calendario</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Semana anterior"
            onClick={goToPreviousWeek}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium text-gray-700 min-w-[140px] text-center">
            {headerLabel}
          </span>
          <button
            type="button"
            aria-label="Semana siguiente"
            onClick={goToNextWeek}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Contenedor con scroll horizontal: el grid nunca se comprime,
          si no cabe aparece scroll en vez de encoger las columnas */}
      <div className="overflow-x-auto">
        <div
          key={animationKey}
          className="min-w-[700px]"
          style={{
            animation: `${
              direction === "forward" ? "slide-in-right" : "slide-in-left"
            } 0.3s ease-out`,
          }}
        >
          {/* Grid del calendario */}
          <div className="grid grid-cols-[60px_repeat(7,1fr)]">
            {/* Esquina vacía sobre la columna de horas */}
            <div className="sticky left-0 z-10 bg-white border-r border-border" />

            {/* Encabezados de días */}
            {daysState.map((day) => {
              const isToday =
                day.date.toDateString() === new Date().toDateString();
              return (
                <div
                  key={day.date.toISOString()}
                  className={`text-center pb-3 border-b border-border ${
                    isToday ? "bg-[#7883FF]/5 rounded-t-lg" : ""
                  }`}
                >
                  <span
                    className={`text-xs font-semibold ${
                      isToday
                        ? "text-clipper"
                        : "text-gray-700"
                    }`}
                  >
                    {day.label}
                  </span>
                  <div
                    className={`w-7 h-7 mx-auto mt-0.5 flex items-center justify-center rounded-full text-xs ${
                      isToday
                        ? "bg-clipper text-white font-bold"
                        : "text-gray-500"
                    }`}
                  >
                    {day.date.getDate()}
                  </div>
                </div>
              );
            })}

            {/* Columna de horas */}
            <div className="sticky left-0 z-10 bg-white border-r border-border flex flex-col">
              {hours.map((hour) => (
              <div
                key={hour}
                style={{ height: ROW_HEIGHT }}
                className={`text-xs text-gray-500 border-b border-border -translate-y-2 ${
                  hour % 2 === 0 ? "" : ""
                }`}
              >
                {formatHourLabel(hour)}
              </div>
              ))}
            </div>

            {/* Columnas de días con sus citas */}
            {daysState.map((day, dIdx) => (
              <div
                key={day.date.toISOString()}
                className="relative border-l border-border group"
                style={{ height: ROW_HEIGHT * hours.length }}
                onMouseLeave={() => setHoveredDayHour(null)}
              >
                {/* Celdas de fondo: una por cada hora, con borde sutil y hover */}
                <div className="absolute inset-0 flex flex-col">
                  {hours.map((hour, hIdx) => {
                    const isHovered = hoveredDayHour?.dayIndex === dIdx && hoveredDayHour?.hour === hour;
                    const hasAppt = day.appointments.some(
                      (a) => hour >= a.startHour && hour < a.endHour
                    );
                    return (
                      <div
                        key={hour}
                        style={{ height: ROW_HEIGHT }}
                        className={`relative border-b border-border transition-colors ${
                          hIdx % 2 === 0
                            ? "hover:bg-[#7883FF]/8"
                            : "bg-[#F8F8FD] hover:bg-[#7883FF]/8"
                        }`}
                        onMouseEnter={() => setHoveredDayHour({ dayIndex: dIdx, hour })}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, dIdx, hour)}
                      >
                        {/* Botón "+" para agregar cita en celda vacía */}
                        {isHovered && !hasAppt && (
                          <button
                            type="button"
                            onClick={() => setCreateModal({ open: true, dayIndex: dIdx, hour })}
                            className="absolute inset-0 flex items-center justify-center z-20 transition-all"
                          >
                            <span className="flex items-center gap-1 bg-clipper text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-md hover:bg-[#6670e8] transition-colors">
                              <Plus size={10} />
                              Agendar
                            </span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Citas, posicionadas encima de las celdas */}
                {day.appointments.map((appt) => {
                  const top = (appt.startHour - START_HOUR) * ROW_HEIGHT;
                  const height = (appt.endHour - appt.startHour) * ROW_HEIGHT;
                  const styles = colorStyles[appt.color];
                  const isHoveredAppt = hoveredApptId === appt.id;

                  return (
                    <div
                      key={appt.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, dIdx, appt.id)}
                      className={`absolute left-1 right-1 rounded-lg px-2 py-1.5 overflow-hidden transition-shadow cursor-grab active:cursor-grabbing ${
                        isHoveredAppt ? "shadow-lg ring-2 ring-white/50 z-20" : ""
                      }`}
                      style={{ top, height, backgroundColor: styles.bg }}
                      onMouseEnter={() => setHoveredApptId(appt.id)}
                      onMouseLeave={() => setHoveredApptId(null)}
                    >
                      {/* Indicador de arrastre */}
                      {isHoveredAppt && (
                        <div className="absolute top-1 left-1 text-white/60">
                          <Move size={10} />
                        </div>
                      )}

                      {/* Botón eliminar en hover */}
                      {isHoveredAppt && (
                        <button
                          type="button"
                          onClick={() => deleteAppointment(dIdx, appt.id)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/40 transition-colors"
                        >
                          <X size={10} className="text-white" />
                        </button>
                      )}

                      <p
                        className="text-xs font-semibold leading-tight"
                        style={{ color: styles.text }}
                      >
                        {appt.clientName}
                      </p>
                      <p
                        className="text-xs leading-tight"
                        style={{ color: styles.text }}
                      >
                        {formatHourLabel(appt.startHour)} -{" "}
                        {formatHourLabel(appt.endHour)}
                      </p>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal para crear cita */}
      {createModal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setCreateModal({ open: false, dayIndex: 0, hour: 8 })}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Nueva cita</h3>
              <button
                type="button"
                onClick={() => setCreateModal({ open: false, dayIndex: 0, hour: 8 })}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              {daysState[createModal.dayIndex]?.label} ·{" "}
              {formatHourRangeLabel(createModal.hour)}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem("clientName") as HTMLInputElement;
                if (input.value.trim()) {
                  addAppointment(createModal.dayIndex, createModal.hour, input.value.trim());
                }
              }}
              className="flex flex-col gap-4"
            >
              <input
                name="clientName"
                type="text"
                placeholder="Nombre del cliente"
                autoFocus
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-400 text-sm rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-clipper"
              />

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setCreateModal({ open: false, dayIndex: 0, hour: 8 })}
                  className="text-sm font-medium text-gray-500 px-4 py-2.5 hover:text-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-clipper text-white text-sm font-semibold rounded-full px-5 py-2.5 hover:bg-[#6670e8] transition-colors"
                >
                  Agendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmación para mover cita */}
      {confirmMove && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setConfirmMove(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Mover cita</h3>
              <button
                type="button"
                onClick={() => setConfirmMove(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-sm text-gray-600 mb-6">
              <p className="font-semibold text-gray-900">{confirmMove.appt.clientName}</p>

              <div className="flex items-center gap-2">
                <span className="text-gray-500">De:</span>
                <span className="bg-gray-100 px-2.5 py-1 rounded-md text-gray-700 font-medium">
                  {daysState[confirmMove.fromDayIndex]?.label} · {formatHourLabel(confirmMove.fromHour)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-500">A:</span>
                <span className="bg-[#7883FF]/10 px-2.5 py-1 rounded-md text-clipper font-medium">
                  {daysState[confirmMove.toDayIndex]?.label} · {formatHourLabel(confirmMove.toHour)}
                </span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setConfirmMove(null)}
                className="text-sm font-medium text-gray-500 px-4 py-2.5 hover:text-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() =>
                  moveAppointment(
                    confirmMove.appt.id,
                    confirmMove.fromDayIndex,
                    confirmMove.toDayIndex,
                    confirmMove.toHour
                  )
                }
                className="bg-clipper text-white text-sm font-semibold rounded-full px-5 py-2.5 hover:bg-[#6670e8] transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyframes de la animación de slide al cambiar de semana */}
      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(24px);
            opacity: 0.4;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slide-in-left {
          from {
            transform: translateX(-24px);
            opacity: 0.4;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CalendarView;