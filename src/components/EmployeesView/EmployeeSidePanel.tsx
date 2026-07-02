import { useState } from "react";
import { X, Calendar, Star, Scissors, DollarSign } from "lucide-react";
import type { Employee } from "./EmployeeCard";

type Tab = "Información" | "Horarios" | "Permisos" | "Actividad";

const TABS: Tab[] = ["Información", "Horarios", "Permisos", "Actividad"];

type EmployeeSidePanelProps = {
  employee: Employee;
  onClose: () => void;
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const statusConfig = {
  active: { label: "Activo", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  inactive: { label: "Inactivo", bg: "bg-gray-100", text: "text-gray-500", dot: "bg-gray-400" },
  vacation: { label: "Vacaciones", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
};

const formatPrice = (price: number) => `$${price.toLocaleString("es-CO")}`;

const EmployeeSidePanel = ({ employee, onClose }: EmployeeSidePanelProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("Información");
  const status = statusConfig[employee.status];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-[400px] max-w-[90vw] h-full bg-white shadow-2xl flex flex-col overflow-hidden animate-slide-in">
        {/* Encabezado del panel */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="text-lg font-bold text-gray-900">Perfil del empleado</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Avatar + nombre + cargo + estado */}
          <div className="px-6 pb-6 flex flex-col items-center text-center">
            {employee.avatar ? (
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-[#7883FF] flex items-center justify-center text-white text-2xl font-bold">
                {getInitials(employee.name)}
              </div>
            )}
            <h3 className="mt-4 text-lg font-bold text-gray-900">{employee.name}</h3>
            <p className="text-sm text-gray-400 font-medium">{employee.roleLabel}</p>
            <div className="mt-2">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${status.bg} ${status.text}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-100 px-6">
            <div className="flex gap-6">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
                    activeTab === tab
                      ? "text-[#7883FF] border-[#7883FF]"
                      : "text-gray-500 border-transparent hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Contenido según pestaña */}
          <div className="px-6 py-5">
            {activeTab === "Información" && (
              <div className="flex flex-col gap-5">
                {/* Datos personales */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Datos personales
                  </h4>
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-xs text-gray-400">Teléfono</p>
                      <p className="text-sm text-gray-900 font-medium">{employee.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Correo electrónico</p>
                      <p className="text-sm text-gray-900 font-medium">{employee.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Fecha de ingreso</p>
                      <p className="text-sm text-gray-900 font-medium">{employee.hireDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Documento de identidad</p>
                      <p className="text-sm text-gray-900 font-medium">{employee.documentId}</p>
                    </div>
                  </div>
                </div>

                {/* Resumen */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Resumen
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-xl p-3 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#BFBDED] flex items-center justify-center flex-shrink-0">
                        <Calendar size={14} style={{ color: "#723AF3" }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Citas atendidas</p>
                        <p className="text-sm font-bold text-gray-900">{employee.stats.appointmentsAttended}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#C3E2CC] flex items-center justify-center flex-shrink-0">
                        <Star size={14} style={{ color: "#0C7D31" }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Calificación</p>
                        <p className="text-sm font-bold text-gray-900">
                          {employee.stats.averageRating > 0 ? employee.stats.averageRating.toFixed(1) : "—"}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#E9CB93] flex items-center justify-center flex-shrink-0">
                        <Scissors size={14} style={{ color: "#B57600" }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Servicios</p>
                        <p className="text-sm font-bold text-gray-900">{employee.stats.servicesPerformed}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#BFDBFE] flex items-center justify-center flex-shrink-0">
                        <DollarSign size={14} style={{ color: "#2563EB" }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Ingresos del mes</p>
                        <p className="text-sm font-bold text-gray-900">{formatPrice(employee.stats.monthlyRevenue)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Horarios" && (
              <p className="text-sm text-gray-400 text-center py-8">
                Gestión de horarios — próximamente.
              </p>
            )}

            {activeTab === "Permisos" && (
              <p className="text-sm text-gray-400 text-center py-8">
                Gestión de permisos — próximamente.
              </p>
            )}

            {activeTab === "Actividad" && (
              <p className="text-sm text-gray-400 text-center py-8">
                Historial de actividad — próximamente.
              </p>
            )}
          </div>
        </div>

        {/* Acciones inferiores */}
        <div className="border-t border-gray-100 px-6 py-4 flex flex-col gap-2">
          <button
            type="button"
            className="w-full bg-[#7883FF] text-white text-sm font-semibold rounded-full py-3 hover:bg-[#6670e8] transition-colors"
          >
            Editar información
          </button>
          <button
            type="button"
            className="w-full border border-red-200 text-red-500 text-sm font-medium rounded-full py-3 hover:bg-red-50 transition-colors"
          >
            Desactivar empleado
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSidePanel;
