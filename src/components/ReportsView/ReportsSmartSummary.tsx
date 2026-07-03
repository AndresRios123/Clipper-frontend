import {
  TrendingUp,
  Scissors,
  UserCheck,
  CalendarDays,
  Zap,
} from "lucide-react";

const highlights = [
  { icon: Scissors, color: "#723AF3", bg: "#BFBDED", text: "Corte clásico fue el servicio más solicitado este mes" },
  { icon: UserCheck, color: "#0C7D31", bg: "#C3E2CC", text: "Carlos Ruiz fue el empleado con mayor rendimiento" },
  { icon: TrendingUp, color: "#2563EB", bg: "#BFDBFE", text: "Los ingresos crecieron un 15% respecto al mes anterior" },
  { icon: CalendarDays, color: "#B57600", bg: "#E9CB93", text: "Los sábados son el día con mayor cantidad de citas" },
];

const ReportsSmartSummary = () => {
  return (
    <div className="bg-gradient-to-br from-[#7883FF]/5 to-[#A2AAFF]/5 rounded-2xl p-5 border border-[#7883FF]/10">
      <div className="flex items-center gap-2 mb-3">
        <Zap size={16} className="text-[#7883FF]" />
        <h3 className="text-sm font-bold text-gray-900">Resumen inteligente</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {highlights.map((h, i) => {
          const Icon = h.icon;
          return (
            <div key={i} className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: h.bg }}
              >
                <Icon size={14} style={{ color: h.color }} />
              </div>
              <p className="text-sm text-gray-700">{h.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportsSmartSummary;
