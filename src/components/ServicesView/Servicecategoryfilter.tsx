import { Filter, ChevronDown } from "lucide-react";

export type ServiceCategory = "Todos" | "Cortes" | "Barba" | "Coloración" | "Tratamientos" | "Otros";

const CATEGORIES: ServiceCategory[] = [
  "Todos",
  "Cortes",
  "Barba",
  "Coloración",
  "Tratamientos",
  "Otros",
];

type ServiceCategoryFilterProps = {
  activeCategory: ServiceCategory;
  onCategoryChange: (category: ServiceCategory) => void;
};

const ServiceCategoryFilter = ({
  activeCategory,
  onCategoryChange,
}: ServiceCategoryFilterProps) => {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      {/* Tabs de categoría */}
      <div className="flex items-center gap-2 flex-wrap">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-white border border-[#7883FF] text-[#7883FF] shadow-sm"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filtros + Ordenar */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          type="button"
          className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Filter size={15} />
          <span>Filtros</span>
          <ChevronDown size={15} />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span className="hidden sm:inline">Ordenar: Más populares</span>
          <span className="sm:hidden">Ordenar</span>
          <ChevronDown size={15} />
        </button>
      </div>
    </div>
  );
};

export default ServiceCategoryFilter;