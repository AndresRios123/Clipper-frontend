import { useState } from "react";
import { Plus, Users, UserCheck, Scissors, Shield } from "lucide-react";
import SearchInput from "../SearchInput/SearchInput";
import StatCard from "../StatCard/StatCard";

type EmployeesHeaderProps = {
  onNewEmployee?: () => void;
};

const EmployeesHeader = ({ onNewEmployee }: EmployeesHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Empleados</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona la informacion y permisos de tu equipo de trabajo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar empleado..."
            className="w-56"
          />
          <button
            type="button"
            onClick={onNewEmployee}
            className="flex items-center justify-center gap-2 bg-[#7883FF] text-white text-sm font-semibold rounded-full px-5 py-2.5 hover:bg-[#6670e8] transition-colors whitespace-nowrap"
          >
            <Plus size={16} />
            Nuevo empleado
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Users size={20} style={{ color: "#723AF3" }} />}
          iconBgColor="#BFBDED"
          label="Total empleados"
          value={8}
          bottomLabel="En total"
        />
        <StatCard
          icon={<UserCheck size={20} style={{ color: "#0C7D31" }} />}
          iconBgColor="#C3E2CC"
          label="Empleados activos"
          value={6}
          bottomLabel="% del total"
        />
        <StatCard
          icon={<Scissors size={20} style={{ color: "#B57600" }} />}
          iconBgColor="#E9CB93"
          label="Barberos"
          value={5}
          bottomLabel="Prestan servicios"
        />
        <StatCard
          icon={<Shield size={20} style={{ color: "#2563EB" }} />}
          iconBgColor="#BFDBFE"
          label="Administradores"
          value={3}
          bottomLabel="Acceso completo"
        />
      </div>
    </div>
  );
};

export default EmployeesHeader;
