import { useState, useEffect } from "react";
import {
  Scissors,
  UserCheck,
  Palette,
  Pencil,
  Smile,
  Wind,
  Package,
} from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServiceCard from "./Servicecard";
import type { Service } from "./Servicecard";
import type { ServiceCategory } from "./Servicecategoryfilter";

// ---------- Datos de ejemplo ----------
const SAMPLE_SERVICES: Service[] = [
  {
    id: "1",
    name: "Corte clásico",
    description: "Corte tradicional con tijera y máquina.",
    duration: 30,
    price: "$30.000",
    status: "Activo",
    category: "Cortes",
    icon: <Scissors size={20} />,
  },
  {
    id: "2",
    name: "Corte + barba",
    description: "Corte de cabello y arreglo de barba.",
    duration: 45,
    price: "$45.000",
    status: "Activo",
    category: "Barba",
    icon: <UserCheck size={20} />,
  },
  {
    id: "3",
    name: "Arreglo de barba",
    description: "Definición y arreglo de barba.",
    duration: 20,
    price: "$20.000",
    status: "Activo",
    category: "Barba",
    icon: <UserCheck size={20} />,
  },
  {
    id: "4",
    name: "Coloración",
    description: "Aplicación de color para el cabello.",
    duration: 60,
    price: "$80.000",
    status: "Activo",
    category: "Coloración",
    icon: <Palette size={20} />,
  },
  {
    id: "5",
    name: "Afeitado al ras",
    description: "Afeitado tradicional con navaja.",
    duration: 15,
    price: "$15.000",
    status: "Activo",
    category: "Barba",
    icon: <Pencil size={20} />,
  },
  {
    id: "6",
    name: "Limpieza facial",
    description: "Limpieza e hidratación facial.",
    duration: 30,
    price: "$25.000",
    status: "Inactivo",
    category: "Tratamientos",
    icon: <Smile size={20} />,
  },
  {
    id: "7",
    name: "Peinado",
    description: "Peinado y styling profesional.",
    duration: 20,
    price: "$18.000",
    status: "Activo",
    category: "Cortes",
    icon: <Wind size={20} />,
  },
  {
    id: "8",
    name: "Paquete completo",
    description: "Corte + barba + afeitado y limpieza facial.",
    duration: 90,
    price: "$95.000",
    status: "Activo",
    category: "Otros",
    icon: <Package size={20} />,
  },
];

// ---------- Paginación ----------
const PAGE_SIZE = 8;

const getPaginationPages = (current: number, total: number) => {
  if (total <= 4) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 2) return [1, 2, 3, null, total];
  if (current >= total - 1) return [1, null, total - 1, total];
  return [1, null, current, null, total];
};

// ---------- Props ----------
type ServicesGridProps = {
  activeCategory: ServiceCategory;
};

const ServicesGrid = ({ activeCategory }: ServicesGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const filtered =
    activeCategory === "Todos"
      ? SAMPLE_SERVICES
      : SAMPLE_SERVICES.filter((s) => s.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const pages = getPaginationPages(currentPage, totalPages);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  return (
    <div className="flex flex-col gap-6">
      {/* Grid de tarjetas */}
      {paginated.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-12">
          No hay servicios en esta categoría.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {paginated.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}

      {/* Footer: conteo + paginación */}
      {filtered.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            Mostrando {(currentPage - 1) * PAGE_SIZE + 1} a{" "}
            {Math.min(currentPage * PAGE_SIZE, filtered.length)} de{" "}
            {filtered.length} servicios
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} />
            </button>

            {pages.map((page, i) =>
              page === null ? (
                <span
                  key={`ellipsis-${i}`}
                  className="w-8 h-8 flex items-center justify-center text-xs text-gray-400"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                    page === currentPage
                      ? "bg-[#7883FF] text-white"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesGrid;