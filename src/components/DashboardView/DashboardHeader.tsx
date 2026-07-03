import { DollarSign, CalendarDays, Users, Clock } from "lucide-react";
import StatCard from "../StatCard/StatCard";

const today = new Date();
const hour = today.getHours();
const greeting = hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches";

const dayName = today.toLocaleDateString("es-ES", { weekday: "long" });
const dayNumber = today.getDate();
const monthName = today.toLocaleDateString("es-ES", { month: "long" });
const formattedDate = `${dayName}, ${dayNumber} de ${monthName}`;

const DashboardHeader = () => {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-6">
      <div>
        <p className="text-sm text-gray-500">{formattedDate}</p>
        <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
          {greeting}, Barbería Clipper
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Aquí tienes un resumen de tu jornada.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<DollarSign size={20} style={{ color: "#0C7D31" }} />}
          iconBgColor="#C3E2CC"
          label="Ingresos del día"
          value="$450,000"
          changePercentage={12}
        />
        <StatCard
          icon={<CalendarDays size={20} style={{ color: "#723AF3" }} />}
          iconBgColor="#BFBDED"
          label="Citas programadas"
          value={8}
          changePercentage={5}
        />
        <StatCard
          icon={<Users size={20} style={{ color: "#2563EB" }} />}
          iconBgColor="#BFDBFE"
          label="Clientes atendidos"
          value={6}
          changePercentage={20}
        />
        <StatCard
          icon={<Clock size={20} style={{ color: "#B57600" }} />}
          iconBgColor="#E9CB93"
          label="Citas pendientes"
          value={3}
          changePercentage={-15}
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
