import { Filter, ChevronDown } from "lucide-react";

export type EmployeeCategory = "Todos" | "Barberos" | "Recepcionistas" | "Administradores" | "Inactivos";

const CATEGORIES: EmployeeCategory[] = [
  "Todos",
  "Barberos",
  "Recepcionistas",
  "Administradores",
  "Inactivos",
];

type EmployeeFilterBarProps = {
  activeCategory: EmployeeCategory;
  onCategoryChange: (category: EmployeeCategory) => void;
};

const EmployeeFilterBar = ({ activeCategory, onCategoryChange }: EmployeeFilterBarProps) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 flex-wrap">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#7883FF]/10 border border-[#7883FF] text-[#7883FF]"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
      >
        <Filter size={15} />
        <span className="hidden sm:inline">Filtros</span>
        <ChevronDown size={15} />
      </button>
    </div>
  );
};

export default EmployeeFilterBar;
