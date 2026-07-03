import { TrendingUp, DollarSign, CalendarDays, Users, Ticket } from "lucide-react";

const metrics = [
  { icon: DollarSign, color: "#0C7D31", bg: "#C3E2CC", label: "Ingresos totales", value: "$12,450,000", change: 15 },
  { icon: CalendarDays, color: "#723AF3", bg: "#BFBDED", label: "Citas realizadas", value: "186", change: 8 },
  { icon: Users, color: "#2563EB", bg: "#BFDBFE", label: "Nuevos clientes", value: "42", change: 22 },
  { icon: Ticket, color: "#B57600", bg: "#E9CB93", label: "Ticket promedio", value: "$66,935", change: 5 },
  { icon: TrendingUp, color: "#0C7D31", bg: "#C3E2CC", label: "Crecimiento", value: "15%", change: 15 },
];

const ReportsSummary = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div key={m.label} className="bg-white rounded-2xl p-4 flex flex-col gap-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: m.bg }}
            >
              <Icon size={16} style={{ color: m.color }} />
            </div>
            <p className="text-xs text-gray-500">{m.label}</p>
            <div className="flex items-end gap-2">
              <p className="text-lg font-bold text-gray-900">{m.value}</p>
              <span
                className="text-xs font-semibold mb-0.5"
                style={{ color: m.change >= 0 ? "#0C7D31" : "#DC2626" }}
              >
                +{m.change}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReportsSummary;
