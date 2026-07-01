import { ChevronLeft, ChevronRight } from "lucide-react";

// ---------- Tipos genéricos ----------

// Cada columna recibe el tipo del dato que renderiza (T)
export type Column<T> = {
  key: string;
  header: string;
  width?: string; // ej. "w-40", "w-24", opcional
  render: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string; // cómo obtener un id único por fila
  totalItems?: number; // total real (para la paginación, ej. 128)
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
};

// ---------- Paginación ----------

const getPaginationPages = (currentPage: number, totalPages: number) => {
  // Devuelve un array con los números a mostrar, usando null como separador "..."
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, null, totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [1, null, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, null, currentPage - 1, currentPage, currentPage + 1, null, totalPages];
};

// ---------- Componente ----------

function DataTable<T>({
  columns,
  data,
  keyExtractor,
  totalItems = 0,
  currentPage = 1,
  pageSize = 5,
  onPageChange,
  emptyMessage = "No hay datos para mostrar.",
}: DataTableProps<T>) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const pages = getPaginationPages(currentPage, totalPages);

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-4">
      {/* Tabla con scroll horizontal en pantallas pequeñas */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          {/* Header */}
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`text-left text-xs font-medium text-gray-500 pb-3 pr-4 ${
                    col.width ?? ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-sm text-gray-400 py-10"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={keyExtractor(row)}
                  className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="py-3 pr-4 text-sm text-gray-700">
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer: conteo + paginación */}
      {totalItems > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            Mostrando {startItem} a {endItem} de {totalItems} clientes
          </p>

          <div className="flex items-center justify-center gap-1 flex-wrap">
            {/* Anterior */}
            <button
              type="button"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} />
            </button>

            {/* Números */}
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
                  onClick={() => onPageChange?.(page)}
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

            {/* Siguiente */}
            <button
              type="button"
              onClick={() => onPageChange?.(currentPage + 1)}
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
}

export default DataTable;