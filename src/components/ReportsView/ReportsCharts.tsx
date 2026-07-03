import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const revenueData = [
  { month: "Ene", ingresos: 8500000 },
  { month: "Feb", ingresos: 9200000 },
  { month: "Mar", ingresos: 7800000 },
  { month: "Abr", ingresos: 10500000 },
  { month: "May", ingresos: 12450000 },
  { month: "Jun", ingresos: 11200000 },
];

const appointmentsByDay = [
  { day: "Lun", citas: 28 },
  { day: "Mar", citas: 32 },
  { day: "Mié", citas: 35 },
  { day: "Jue", citas: 30 },
  { day: "Vie", citas: 42 },
  { day: "Sáb", citas: 48 },
  { day: "Dom", citas: 12 },
];

const serviceDistribution = [
  { name: "Corte clásico", value: 35 },
  { name: "Corte + barba", value: 25 },
  { name: "Barba", value: 18 },
  { name: "Afeitado", value: 12 },
  { name: "Otros", value: 10 },
];

const COLORS = ["#7883FF", "#A2AAFF", "#47C34F", "#E9CB93", "#BFDBFE"];

const ReportsCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Ingresos - Línea */}
      <div className="bg-white rounded-2xl p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-900">Evolución de ingresos</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
              <Tooltip />
              <Line type="monotone" dataKey="ingresos" stroke="#7883FF" strokeWidth={2} dot={{ fill: "#7883FF", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Citas por día - Barras */}
      <div className="bg-white rounded-2xl p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-900">Citas por día de la semana</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={appointmentsByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="citas" fill="#7883FF" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribución de servicios - Pastel */}
      <div className="bg-white rounded-2xl p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-900">Servicios más solicitados</h3>
        <div className="h-64 flex items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={serviceDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {serviceDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                verticalAlign="bottom"
                formatter={(value: string) => <span className="text-xs text-gray-600">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mapa de calor (horas vs días) */}
      <div className="bg-white rounded-2xl p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-900">Horarios con mayor demanda</h3>
        <div className="flex-1 flex items-center justify-center">
          <HeatMap />
        </div>
      </div>
    </div>
  );
};

const HOURS = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"];
const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const intensityData: Record<string, number> = {
  "Lun-8am": 2, "Lun-9am": 3, "Lun-10am": 5, "Lun-11am": 4, "Lun-12pm": 3, "Lun-1pm": 2, "Lun-2pm": 4, "Lun-3pm": 5, "Lun-4pm": 6, "Lun-5pm": 4, "Lun-6pm": 3, "Lun-7pm": 1,
  "Mar-8am": 1, "Mar-9am": 4, "Mar-10am": 6, "Mar-11am": 5, "Mar-12pm": 3, "Mar-1pm": 2, "Mar-2pm": 5, "Mar-3pm": 6, "Mar-4pm": 7, "Mar-5pm": 5, "Mar-6pm": 3, "Mar-7pm": 2,
  "Mié-8am": 3, "Mié-9am": 5, "Mié-10am": 7, "Mié-11am": 6, "Mié-12pm": 4, "Mié-1pm": 3, "Mié-2pm": 5, "Mié-3pm": 8, "Mié-4pm": 6, "Mié-5pm": 5, "Mié-6pm": 4, "Mié-7pm": 2,
  "Jue-8am": 2, "Jue-9am": 3, "Jue-10am": 5, "Jue-11am": 4, "Jue-12pm": 5, "Jue-1pm": 3, "Jue-2pm": 4, "Jue-3pm": 5, "Jue-4pm": 6, "Jue-5pm": 4, "Jue-6pm": 2, "Jue-7pm": 1,
  "Vie-8am": 4, "Vie-9am": 6, "Vie-10am": 8, "Vie-11am": 7, "Vie-12pm": 6, "Vie-1pm": 4, "Vie-2pm": 7, "Vie-3pm": 9, "Vie-4pm": 8, "Vie-5pm": 6, "Vie-6pm": 5, "Vie-7pm": 3,
  "Sáb-8am": 5, "Sáb-9am": 7, "Sáb-10am": 9, "Sáb-11am": 8, "Sáb-12pm": 7, "Sáb-1pm": 5, "Sáb-2pm": 8, "Sáb-3pm": 10, "Sáb-4pm": 9, "Sáb-5pm": 7, "Sáb-6pm": 5, "Sáb-7pm": 3,
};

const getIntensityColor = (val: number) => {
  if (val <= 2) return "bg-[#7883FF]/10";
  if (val <= 4) return "bg-[#7883FF]/25";
  if (val <= 6) return "bg-[#7883FF]/45";
  if (val <= 8) return "bg-[#7883FF]/65";
  return "bg-[#7883FF]/85";
};

const HeatMap = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[500px]">
        <thead>
          <tr>
            <th className="text-xs text-gray-400 font-medium p-1 text-left w-10" />
            {HOURS.map((h) => (
              <th key={h} className="text-[10px] text-gray-400 font-medium p-1 text-center">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DAYS.map((day) => (
            <tr key={day}>
              <td className="text-xs text-gray-500 font-medium p-1 text-left">{day}</td>
              {HOURS.map((hour) => {
                const val = intensityData[`${day}-${hour}`] ?? 0;
                return (
                  <td key={hour} className="p-0.5">
                    <div
                      className={`w-full h-6 rounded ${getIntensityColor(val)}`}
                      title={`${day} ${hour}: ${val} citas`}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsCharts;
