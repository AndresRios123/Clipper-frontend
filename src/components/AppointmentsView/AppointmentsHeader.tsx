import { Plus, CalendarDays, Clock, CheckCircle2, Link } from "lucide-react";
import StatCard from "../StatCard/StatCard";

type AppointmentsHeaderProps = {
  onNewAppointment?: () => void;
};

const AppointmentsHeader = ({ onNewAppointment }: AppointmentsHeaderProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-6">
      {/* Título + descripción + botones */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Citas</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona todas las citas de tu negocio.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-[#7883FF] text-[#7883FF] text-sm font-semibold rounded-full px-5 py-2.5 hover:bg-[#7883FF] hover:text-white transition-colors"
          >
            <Link size={16} />
            Enlace
          </button>
          <button
            type="button"
            onClick={onNewAppointment}
            className="flex items-center justify-center gap-2 bg-[#7883FF] text-white text-sm font-semibold rounded-full px-5 py-2.5 hover:bg-[#6670e8] transition-colors"
          >
            <Plus size={16} />
            Nueva cita
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<CalendarDays size={20} style={{ color: "#723AF3" }} />}
          iconBgColor="#BFBDED"
          label="Citas hoy"
          value={8}
          changePercentage={14}
        />

        <StatCard
          icon={<Clock size={20} style={{ color: "#B57600" }} />}
          iconBgColor="#E9CB93"
          label="Citas pendientes"
          value={3}
          changePercentage={-5}
        />

        <StatCard
          icon={<CheckCircle2 size={20} style={{ color: "#0C7D31" }} />}
          iconBgColor="#C3E2CC"
          label="Citas completadas hoy"
          value={5}
          changePercentage={20}
        />
      </div>
    </div>
  );
};

export default AppointmentsHeader;
