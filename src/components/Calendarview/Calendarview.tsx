import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

type HoveredCell = {
  dayLabel: string;
  hour: number;
  x: number;
  y: number;
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

const CalendarView = () => {
  // Ancla inicial: el lunes de la semana del 20 de mayo de 2026 (donde están
  // los datos de demo). Cambia esto a `new Date()` si quieres que abra
  // siempre en la semana actual real.
  const [currentMonday, setCurrentMonday] = useState(() =>
    getMondayOfWeek(new Date(2026, 4, 20))
  );
  const [hoveredCell, setHoveredCell] = useState<HoveredCell | null>(null);
  // Dirección del último cambio de semana, usada para animar el slide:
  // "forward" = la semana nueva entra desde la derecha (avanzar)
  // "backward" = la semana nueva entra desde la izquierda (retroceder)
  const [direction, setDirection] = useState<"forward" | "backward">(
    "forward"
  );
  // Cambia junto con currentMonday para forzar que React remonte el bloque
  // de la semana y dispare la animación de entrada cada vez
  const [animationKey, setAnimationKey] = useState(0);

  const days = useMemo(() => buildWeek(currentMonday), [currentMonday]);
  const headerLabel = useMemo(() => getHeaderLabel(days), [days]);

  const goToPreviousWeek = () => {
    const prev = new Date(currentMonday);
    prev.setDate(prev.getDate() - 7);
    setDirection("backward");
    setCurrentMonday(prev);
    setAnimationKey((k) => k + 1);
  };

  const goToNextWeek = () => {
    const next = new Date(currentMonday);
    next.setDate(next.getDate() + 7);
    setDirection("forward");
    setCurrentMonday(next);
    setAnimationKey((k) => k + 1);
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
            {days.map((day) => {
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
            {days.map((day) => (
              <div
                key={day.date.toISOString()}
                className="relative border-l border-border"
                style={{ height: ROW_HEIGHT * hours.length }}
              >
                {/* Celdas de fondo: una por cada hora, con borde sutil y hover */}
                <div className="absolute inset-0 flex flex-col">
                  {hours.map((hour, hIdx) => (
                    <div
                      key={hour}
                      style={{ height: ROW_HEIGHT }}
                      className={`border-b border-border transition-colors ${
                        hIdx % 2 === 0
                          ? "hover:bg-[#7883FF]/8"
                          : "bg-[#F8F8FD] hover:bg-[#7883FF]/8"
                      }`}
                      onMouseEnter={() =>
                        setHoveredCell({ dayLabel: day.label, hour, x: 0, y: 0 })
                      }
                      onMouseMove={(e) =>
                        setHoveredCell({
                          dayLabel: day.label,
                          hour,
                          x: e.clientX,
                          y: e.clientY,
                        })
                      }
                      onMouseLeave={() => setHoveredCell(null)}
                    />
                  ))}
                </div>

                {/* Citas, posicionadas encima de las celdas */}
                {day.appointments.map((appt) => {
                  const top = (appt.startHour - START_HOUR) * ROW_HEIGHT;
                  const height = (appt.endHour - appt.startHour) * ROW_HEIGHT;
                  const styles = colorStyles[appt.color];

                  return (
                    <div
                      key={appt.id}
                      className="absolute left-1 right-1 rounded-lg px-2 py-1.5 overflow-hidden pointer-events-none"
                      style={{
                        top,
                        height,
                        backgroundColor: styles.bg,
                      }}
                    >
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

      {/* Tooltip flotante que sigue al cursor */}
      {hoveredCell && (
        <div
          className="fixed z-50 pointer-events-none bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-md shadow-lg"
          style={{
            left: hoveredCell.x + 12,
            top: hoveredCell.y + 12,
          }}
        >
          {hoveredCell.dayLabel} · {formatHourRangeLabel(hoveredCell.hour)}
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