import { useState } from "react";
import { Phone, Mail, Eye, Pencil, Trash2 } from "lucide-react";
import DataTable from "./DataTable";
import type { Column } from "./DataTable";

// ---------- Tipo del dato ----------
export type Client = {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastVisitDate: string;
  lastVisitRelative: string; // "Hace 2 días"
  totalAppointments: number;
  totalSpent: string;
  isFrequent: boolean;
};

// ---------- Datos de ejemplo ----------
const SAMPLE_CLIENTS: Client[] = [
  {
    id: "1",
    name: "Andrés Martínez",
    phone: "+57 300 1234567",
    email: "andres.martinez@gmail.com",
    lastVisitDate: "24 may 2026",
    lastVisitRelative: "Hace 2 días",
    totalAppointments: 12,
    totalSpent: "$100,000",
    isFrequent: true,
  },
  {
    id: "2",
    name: "Carlos Ruiz",
    phone: "+57 300 1234567",
    email: "carlos.ruiz@gmail.com",
    lastVisitDate: "24 may 2026",
    lastVisitRelative: "Hace 2 días",
    totalAppointments: 8,
    totalSpent: "$300,000",
    isFrequent: false,
  },
  {
    id: "3",
    name: "Juan Pérez",
    phone: "+57 300 1234567",
    email: "juan.perez@gmail.com",
    lastVisitDate: "24 may 2026",
    lastVisitRelative: "Hace 2 días",
    totalAppointments: 6,
    totalSpent: "$320,000",
    isFrequent: false,
  },
  {
    id: "4",
    name: "Charlie García",
    phone: "+57 300 1234567",
    email: "charlie.garcia@gmail.com",
    lastVisitDate: "24 may 2026",
    lastVisitRelative: "Hace 2 días",
    totalAppointments: 15,
    totalSpent: "$300,000",
    isFrequent: true,
  },
  {
    id: "5",
    name: "Juan Ordoñez",
    phone: "+57 300 1234567",
    email: "juan.ordonez@gmail.com",
    lastVisitDate: "24 may 2026",
    lastVisitRelative: "Hace 2 días",
    totalAppointments: 3,
    totalSpent: "$100,000",
    isFrequent: false,
  },
];

// ---------- Definición de columnas ----------
const clientColumns: Column<Client>[] = [
  {
    key: "name",
    header: "Cliente",
    render: (client) => (
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#7883FF] flex-shrink-0" />
        <span className="font-medium text-gray-900">{client.name}</span>
      </div>
    ),
  },
  {
    key: "contact",
    header: "Contacto",
    render: (client) => (
      <div className="flex flex-col gap-0.5">
        <span className="flex items-center gap-1.5 text-xs text-gray-600">
          <Phone size={12} className="text-gray-400" />
          {client.phone}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-600">
          <Mail size={12} className="text-gray-400" />
          {client.email}
        </span>
      </div>
    ),
  },
  {
    key: "lastVisit",
    header: "Última visita",
    render: (client) => (
      <div className="flex flex-col">
        <span className="text-gray-900">{client.lastVisitDate}</span>
        <span className="text-xs text-gray-400">{client.lastVisitRelative}</span>
      </div>
    ),
  },
  {
    key: "totalAppointments",
    header: "Total citas",
    render: (client) => (
      <span className="text-gray-900">{client.totalAppointments}</span>
    ),
  },
  {
    key: "totalSpent",
    header: "Total gastado",
    render: (client) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium text-gray-900">{client.totalSpent}</span>
        {client.isFrequent && (
          <span className="inline-flex w-fit text-xs font-semibold text-white bg-[#47C34F] rounded-full px-2 py-0.5">
            Frecuente
          </span>
        )}
      </div>
    ),
  },
  {
    key: "actions",
    header: "Acciones",
    render: (_client) => (
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Ver detalle"
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <Eye size={14} className="text-[#7883FF]" />
        </button>
        <button
          type="button"
          aria-label="Editar"
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <Pencil size={14} className="text-[#7883FF]" />
        </button>
        <button
          type="button"
          aria-label="Eliminar"
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <Trash2 size={14} className="text-red-400" />
        </button>
      </div>
    ),
  },
];

// ---------- Componente ----------
const ClientsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;

  // Cuando conectes la API, reemplaza SAMPLE_CLIENTS con los datos reales
  // y usa el total real en totalItems
  const paginatedData = SAMPLE_CLIENTS.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <DataTable
      columns={clientColumns}
      data={paginatedData}
      keyExtractor={(client) => client.id}
      totalItems={128}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      onPageChange={setCurrentPage}
      emptyMessage="No se encontraron clientes."
    />
  );
};

export default ClientsTable;