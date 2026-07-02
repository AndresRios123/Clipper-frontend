import { MoreVertical, Eye } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export type EmployeeStatus = "active" | "inactive" | "vacation";

export type EmployeeRole = "barber" | "receptionist" | "admin";

export type Employee = {
  id: string;
  name: string;
  avatar?: string;
  role: EmployeeRole;
  roleLabel: string;
  status: EmployeeStatus;
  phone: string;
  email: string;
  hireDate: string;
  documentId: string;
  stats: {
    appointmentsAttended: number;
    averageRating: number;
    servicesPerformed: number;
    monthlyRevenue: number;
  };
};

type EmployeeCardProps = {
  employee: Employee;
  isSelected: boolean;
  onSelect: (employee: Employee) => void;
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const statusConfig: Record<EmployeeStatus, { label: string; bg: string; text: string; dot: string }> = {
  active: { label: "Activo", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  inactive: { label: "Inactivo", bg: "bg-gray-100", text: "text-gray-500", dot: "bg-gray-400" },
  vacation: { label: "Vacaciones", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
};

const EmployeeCard = ({ employee, isSelected, onSelect }: EmployeeCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const status = statusConfig[employee.status];

  return (
    <div
      className={`bg-white rounded-2xl border transition-all cursor-pointer ${
        isSelected
          ? "border-[#7883FF] ring-1 ring-[#7883FF]/20 shadow-sm"
          : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
      }`}
      onClick={() => onSelect(employee)}
    >
      {/* Header con avatar + menú */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between">
          {/* Avatar */}
          {employee.avatar ? (
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-12 h-12 rounded-xl object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-[#7883FF] flex items-center justify-center text-white text-sm font-bold">
              {getInitials(employee.name)}
            </div>
          )}

          {/* Menú contextual */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((prev) => !prev);
              }}
              aria-label="Más opciones"
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
            >
              <MoreVertical size={16} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl border border-gray-100 shadow-lg py-1 z-20">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    onSelect(employee);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Ver perfil
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  Desactivar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Nombre */}
        <h3 className="mt-3 text-sm font-semibold text-gray-900">{employee.name}</h3>

        {/* Cargo */}
        <span className="inline-block mt-0.5 text-xs text-gray-400 font-medium">
          {employee.roleLabel}
        </span>

        {/* Contacto */}
        <div className="mt-3 flex flex-col gap-1">
          <p className="text-xs text-gray-500">{employee.phone}</p>
          <p className="text-xs text-gray-500 truncate">{employee.email}</p>
        </div>

        {/* Estado */}
        <div className="mt-3">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-5 py-3 flex justify-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(employee);
          }}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-[#7883FF] transition-colors"
        >
          <Eye size={13} />
          Ver perfil
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
