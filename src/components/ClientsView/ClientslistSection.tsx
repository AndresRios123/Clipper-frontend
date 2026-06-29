import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import SearchInput from "./SearchInput";

const ClientsListSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
      {/* Barra de búsqueda + filtros + ordenar */}
      <div className="flex items-center gap-3">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar cliente por nombre, teléfono o correo..."
          className="flex-1"
        />

        <button
          type="button"
          className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
        >
          <Filter size={16} />
          Filtros
        </button>

        <button
          type="button"
          className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
        >
          Ordenar: Más recientes
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Aquí va la tabla de clientes + paginación (siguiente paso) */}
    </div>
  );
};

export default ClientsListSection;