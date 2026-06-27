import { ChevronLeft, ChevronRight } from "lucide-react";

// ---------- Tipos ----------
type AppointmentColor = "green" | "blue" | "orange";

type Appointment = {
  id: string;
  clientName: string;
  startHour: number; // hora de inicio en formato 24h (8 = 8am, 13 = 1pm)
  endHour: number; // hora de fin en formato 24h
  timeLabel: string; // texto a mostrar, ej. "8am - 9am"
  color: AppointmentColor;
};

type DayColumn = {
  label: string; // "Lun", "Mar", etc.
  date: number; // 20, 21, etc.
  appointments: Appointment[];
};

// ---------- Configuración del grid ----------
const START_HOUR = 8; // 8:00
const END_HOUR = 18; // 6:00 pm
const hours = Array.from(
  { length: END_HOUR - START_HOUR + 1 },
  (_, i) => START_HOUR + i
);

const formatHourLabel = (hour: number) => {
  const display = hour > 12 ? hour - 12 : hour;
  return `${display}:00`;
};

// ---------- Datos de ejemplo (vendrán de una API más adelante) ----------
const days: DayColumn[] = [
  {
    label: "Lun",
    date: 20,
    appointments: [
      {
        id: "1",
        clientName: "Carlos M.",
        startHour: 8,
        endHour: 9,
        timeLabel: "8 am - 9 am",
        color: "green",
      },
    ],
  },
  {
    label: "Mar",
    date: 21,
    appointments: [
      {
        id: "2",
        clientName: "Lucía S.",
        startHour: 8,
        endHour: 9,
        timeLabel: "8 am - 9 am",
        color: "blue",
      },
      {
        id: "3",
        clientName: "Cristian G.",
        startHour: 10,
        endHour: 11,
        timeLabel: "10 am - 11 am",
        color: "green",
      },
      {
        id: "4",
        clientName: "María L.",
        startHour: 13,
        endHour: 16,
        timeLabel: "1 pm - 4 pm",
        color: "orange",
      },
    ],
  },
  {
    label: "Mié",
    date: 22,
    appointments: [
      {
        id: "5",
        clientName: "Andrés R.",
        startHour: 8,
        endHour: 11,
        timeLabel: "8 am - 11 am",
        color: "orange",
      },
    ],
  },
  {
    label: "Jue",
    date: 23,
    appointments: [
      {
        id: "6",
        clientName: "Cristian G.",
        startHour: 10,
        endHour: 11,
        timeLabel: "10 am - 11 am",
        color: "green",
      },
      {
        id: "7",
        clientName: "Diego L.",
        startHour: 13,
        endHour: 16,
        timeLabel: "1 pm - 4 pm",
        color: "blue",
      },
    ],
  },
  {
    label: "Vie",
    date: 24,
    appointments: [
      {
        id: "8",
        clientName: "Diego L.",
        startHour: 8,
        endHour: 11,
        timeLabel: "8 am - 11 am",
        color: "blue",
      },
      {
        id: "9",
        clientName: "Andrés R.",
        startHour: 11,
        endHour: 13,
        timeLabel: "11 am - 1 pm",
        color: "orange",
      },
    ],
  },
  {
    label: "Sáb",
    date: 25,
    appointments: [
      {
        id: "10",
        clientName: "Carlos M.",
        startHour: 13,
        endHour: 16,
        timeLabel: "1 pm - 4 pm",
        color: "green",
      },
    ],
  },
  {
    label: "Dom",
    date: 26,
    appointments: [],
  },
];

// ---------- Estilos por color ----------
const colorStyles: Record<AppointmentColor, { bg: string; text: string }> = {
  green: { bg: "#A9CCAA", text: "#166327" },
  blue: { bg: "#97A7E5", text: "#143CD1" },
  orange: { bg: "#F5C5A6", text: "#B15115" },
};

const ROW_HEIGHT = 40; // alto en px de cada fila de 1 hora

const CalendarView = () => {
  return (
    <div className="w-full bg-white rounded-2xl p-6">
      {/* Header: título + navegación de mes */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Calendario</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Mes anterior"
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium text-gray-700">Mayo 2026</span>
          <button
            type="button"
            aria-label="Mes siguiente"
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Grid del calendario */}
      <div className="grid grid-cols-[60px_repeat(7,1fr)]">
        {/* Esquina vacía sobre la columna de horas */}
        <div />

        {/* Encabezados de días */}
        {days.map((day) => (
          <div
            key={day.label}
            className="text-center pb-3 border-b border-gray-200"
          >
            <p className="text-xs font-semibold text-gray-700">{day.label}</p>
            <p className="text-xs text-gray-500">{day.date}</p>
          </div>
        ))}

        {/* Columna de horas */}
        <div className="flex flex-col">
          {hours.map((hour) => (
            <div
              key={hour}
              style={{ height: ROW_HEIGHT }}
              className="text-xs text-gray-500 -translate-y-2"
            >
              {formatHourLabel(hour)}
            </div>
          ))}
        </div>

        {/* Columnas de días con sus citas */}
        {days.map((day) => (
          <div
            key={day.label}
            className="relative border-l border-gray-100"
            style={{ height: ROW_HEIGHT * hours.length }}
          >
            {day.appointments.map((appt) => {
              const top = (appt.startHour - START_HOUR) * ROW_HEIGHT;
              const height = (appt.endHour - appt.startHour) * ROW_HEIGHT;
              const styles = colorStyles[appt.color];

              return (
                <div
                  key={appt.id}
                  className="absolute left-1 right-1 rounded-lg px-2 py-1.5 overflow-hidden"
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
                    {appt.timeLabel}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;