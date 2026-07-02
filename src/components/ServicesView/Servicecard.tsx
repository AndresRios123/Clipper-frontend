import { MoreVertical, Pencil, Eye } from "lucide-react";
import type { ReactNode } from "react";

export type ServiceStatus = "Activo" | "Inactivo";

export type Service = {
  id: string;
  name: string;
  description: string;
  duration: number; // en minutos
  price: string; // ej. "$30.000"
  status: ServiceStatus;
  category: string;
  icon: ReactNode;
};

type ServiceCardProps = {
  service: Service;
  onEdit?: (service: Service) => void;
  onView?: (service: Service) => void;
};

const statusStyles: Record<ServiceStatus, { bg: string; text: string; dot: string }> = {
  Activo: {
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-500",
  },
  Inactivo: {
    bg: "bg-gray-100",
    text: "text-gray-500",
    dot: "bg-gray-400",
  },
};

const ServiceCard = ({ service, onEdit, onView }: ServiceCardProps) => {
  const status = statusStyles[service.status];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header de la tarjeta */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Ícono + menú de opciones */}
        <div className="flex items-start justify-between">
          <div className="w-11 h-11 rounded-xl bg-[#EEEEFF] flex items-center justify-center text-[#7883FF]">
            {service.icon}
          </div>
          <button
            type="button"
            aria-label="Más opciones"
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <MoreVertical size={16} />
          </button>
        </div>

        {/* Nombre + descripción */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 leading-snug">
            {service.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Duración + precio */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>{service.duration} min</span>
          <span className="text-gray-300">•</span>
          <span className="font-semibold">{service.price}</span>
        </div>

        {/* Badge de estado */}
        <div>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {service.status}
          </span>
        </div>
      </div>

      {/* Footer de acciones */}
      <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onEdit?.(service)}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#7883FF] transition-colors"
        >
          <Pencil size={13} />
          Editar
        </button>

        <button
          type="button"
          onClick={() => onView?.(service)}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#7883FF] transition-colors"
        >
          <Eye size={13} />
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;