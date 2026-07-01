import { Plus, Users, UserPlus, ClipboardList, Star } from "lucide-react";
import StatCard from "../StatCard/StatCard";

type ClientsHeaderProps = {
  onNewClient?: () => void;
};

const ClientsHeader = ({ onNewClient }: ClientsHeaderProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-6">
      {/* Título + descripción + botón */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona la información de tus clientes y su historial.
          </p>
        </div>

        <button
          type="button"
          onClick={onNewClient}
          className="flex items-center justify-center gap-2 bg-[#7883FF] text-white text-sm font-semibold rounded-full px-5 py-2.5 hover:bg-[#6670e8] transition-colors flex-shrink-0 w-full sm:w-auto"
        >
          <Plus size={16} />
          Nuevo cliente
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Users size={20} style={{ color: "#723AF3" }} />}
          iconBgColor="#BFBDED"
          label="Total clientes"
          value={128}
          changePercentage={12}
        />

        <StatCard
          icon={<UserPlus size={20} style={{ color: "#0C7D31" }} />}
          iconBgColor="#C3E2CC"
          label="Nuevos este mes"
          value={12}
          changePercentage={7}
        />

        <StatCard
          icon={<ClipboardList size={20} style={{ color: "#723AF3" }} />}
          iconBgColor="#BFBDED"
          label="Citas este mes"
          value={342}
          changePercentage={15}
        />

        <StatCard
          icon={<Star size={20} style={{ color: "#B57600" }} />}
          iconBgColor="#E9CB93"
          label="Clientes frecuentes"
          value={45}
          changePercentage={9}
        />
      </div>
    </div>
  );
};

export default ClientsHeader;