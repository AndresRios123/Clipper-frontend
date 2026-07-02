import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import SearchInput from "../SearchInput/SearchInput";
import AppointmentsTable from "./AppointmentsTable";

const AppointmentsListSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar cita por cliente, servicio o empleado..."
          className="flex-1 min-w-0"
        />

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Filter size={16} />
            <span className="hidden sm:inline">Filtros</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span className="hidden sm:inline">Ordenar: Más recientes</span>
            <span className="sm:hidden">Ordenar</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="-mx-6 px-6">
        <AppointmentsTable />
      </div>
    </div>
  );
};

export default AppointmentsListSection;
