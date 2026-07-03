import { CheckCircle2, UserPlus, CalendarPlus, Clock } from "lucide-react";

type Activity = {
  icon: typeof CheckCircle2;
  color: string;
  bg: string;
  text: string;
  time: string;
};

const SAMPLE: Activity[] = [
  { icon: CheckCircle2, color: "#0C7D31", bg: "#C3E2CC", text: "Cita completada — Corte clásico con Andrés Martínez", time: "Hace 15 min" },
  { icon: CalendarPlus, color: "#723AF3", bg: "#BFBDED", text: "Nueva cita agendada — Juan Pérez solicitó Corte + barba", time: "Hace 30 min" },
  { icon: UserPlus, color: "#2563EB", bg: "#BFDBFE", text: "Nuevo cliente registrado: Pedro López", time: "Hace 1 h" },
  { icon: Clock, color: "#B57600", bg: "#E9CB93", text: "Cita reprogramada — Carlos Ruiz movió su barba a las 11:30", time: "Hace 2 h" },
  { icon: CheckCircle2, color: "#0C7D31", bg: "#C3E2CC", text: "Cita completada — Barba completa con Carlos Ruiz", time: "Hace 3 h" },
];

const DashboardActivity = () => {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
      <h2 className="text-base font-bold text-gray-900">Actividad reciente</h2>

      <div className="flex flex-col gap-0">
        {SAMPLE.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-b-0"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: item.bg }}
              >
                <Icon size={14} style={{ color: item.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">{item.text}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardActivity;
