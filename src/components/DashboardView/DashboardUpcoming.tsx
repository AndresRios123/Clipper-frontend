import { Clock } from "lucide-react";

type UpcomingAppt = {
  time: string;
  client: string;
  service: string;
  employee: string;
};

const SAMPLE: UpcomingAppt[] = [
  { time: "09:00", client: "Andrés Martínez", service: "Corte clásico", employee: "Carlos Ruiz" },
  { time: "10:00", client: "Juan Pérez", service: "Corte + barba", employee: "Miguel Ángel" },
  { time: "11:30", client: "Carlos Ruiz", service: "Barba completa", employee: "Carlos Ruiz" },
  { time: "14:00", client: "Pedro López", service: "Corte degradado", employee: "Miguel Ángel" },
  { time: "15:30", client: "Luis Gómez", service: "Afeitado tradicional", employee: "Carlos Ruiz" },
];

const DashboardUpcoming = () => {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
      <h2 className="text-base font-bold text-gray-900">Próximas citas</h2>

      <div className="flex flex-col">
        {SAMPLE.map((appt, i) => (
          <div
            key={i}
            className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-b-0"
          >
            <div className="flex items-center gap-2 w-16 flex-shrink-0">
              <Clock size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-900">{appt.time}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{appt.client}</p>
              <p className="text-xs text-gray-400 truncate">{appt.service}</p>
            </div>
            <span className="text-xs text-gray-400 flex-shrink-0 hidden sm:inline">
              {appt.employee}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardUpcoming;
