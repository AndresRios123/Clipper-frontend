import { useState } from "react";
import { Plus } from "lucide-react";
import SearchInput from "../SearchInput/SearchInput";

type EmployeesHeaderProps = {
  onNewEmployee?: () => void;
};

const EmployeesHeader = ({ onNewEmployee }: EmployeesHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white rounded-2xl p-6">
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
    </div>
  );
};

export default EmployeesHeader;
