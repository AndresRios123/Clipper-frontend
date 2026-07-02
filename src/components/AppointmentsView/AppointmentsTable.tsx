import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import DataTable from "../Datatable/DataTable";
import type { Column } from "../Datatable/DataTable";
import Badge from "../Badge/Badge";

export type Appointment = {
  id: string;
  date: string;
  time: string;
  client: {
    name: string;
    phone: string;
  };
  service: {
    name: string;
    duration: number;
  };
  employee: {
    name: string;
    role: string;
  };
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  price: number;
};

const SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    date: "24 may 2026",
    time: "09:00",
    client: { name: "Andrés Martínez", phone: "+57 300 1234567" },
    service: { name: "Corte clásico", duration: 30 },
    employee: { name: "Carlos Ruiz", role: "Barbero" },
    status: "confirmed",
    price: 45000,
  },
  {
    id: "2",
    date: "24 may 2026",
    time: "10:00",
    client: { name: "Juan Pérez", phone: "+57 300 7654321" },
    service: { name: "Corte + barba", duration: 45 },
    employee: { name: "Miguel Ángel", role: "Barbero" },
    status: "in_progress",
    price: 65000,
  },
  {
    id: "3",
    date: "24 may 2026",
    time: "11:30",
    client: { name: "Carlos Ruiz", phone: "+57 300 9876543" },
    service: { name: "Barba completa", duration: 20 },
    employee: { name: "Carlos Ruiz", role: "Barbero" },
    status: "pending",
    price: 25000,
  },
  {
    id: "4",
    date: "23 may 2026",
    time: "08:30",
    client: { name: "Charlie García", phone: "+57 300 4567890" },
    service: { name: "Corte degradado", duration: 40 },
    employee: { name: "Miguel Ángel", role: "Barbero" },
    status: "completed",
    price: 55000,
  },
  {
    id: "5",
    date: "23 may 2026",
    time: "14:00",
    client: { name: "Juan Ordoñez", phone: "+57 300 3216547" },
    service: { name: "Corte + barba + cejas", duration: 60 },
    employee: { name: "Carlos Ruiz", role: "Barbero" },
    status: "cancelled",
    price: 80000,
  },
  {
    id: "6",
    date: "25 may 2026",
    time: "15:30",
    client: { name: "Pedro López", phone: "+57 300 6543210" },
    service: { name: "Corte clásico", duration: 30 },
    employee: { name: "Miguel Ángel", role: "Barbero" },
    status: "confirmed",
    price: 45000,
  },
  {
    id: "7",
    date: "25 may 2026",
    time: "16:00",
    client: { name: "Luis Gómez", phone: "+57 300 1112233" },
    service: { name: "Afeitado tradicional", duration: 25 },
    employee: { name: "Carlos Ruiz", role: "Barbero" },
    status: "pending",
    price: 35000,
  },
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatPrice = (price: number) => {
  return `$${price.toLocaleString("es-CO")}`;
};

const appointmentColumns: Column<Appointment>[] = [
  {
    key: "time",
    header: "Hora",
    render: (appt) => (
      <div className="flex flex-col">
        <span className="font-medium text-gray-900">{appt.time}</span>
        <span className="text-xs text-gray-400">{appt.date}</span>
      </div>
    ),
  },
  {
    key: "client",
    header: "Cliente",
    width: "w-48",
    render: (appt) => (
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-[#7883FF] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
          {getInitials(appt.client.name)}
        </span>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{appt.client.name}</span>
          <span className="text-xs text-gray-400">{appt.client.phone}</span>
        </div>
      </div>
    ),
  },
  {
    key: "service",
    header: "Servicio",
    render: (appt) => (
      <div className="flex flex-col">
        <span className="text-gray-900">{appt.service.name}</span>
        <span className="text-xs text-gray-400">{appt.service.duration} min</span>
      </div>
    ),
  },
  {
    key: "employee",
    header: "Empleado",
    render: (appt) => (
      <div className="flex flex-col">
        <span className="text-gray-900">{appt.employee.name}</span>
        <span className="text-xs text-gray-400">{appt.employee.role}</span>
      </div>
    ),
  },
  {
    key: "status",
    header: "Estado",
    render: (appt) => <Badge variant={appt.status}>{appt.status}</Badge>,
  },
  {
    key: "price",
    header: "Precio",
    render: (appt) => (
      <span className="font-medium text-gray-900">{formatPrice(appt.price)}</span>
    ),
  },
  {
    key: "actions",
    header: "Acciones",
    render: () => (
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

const AppointmentsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;

  const paginatedData = SAMPLE_APPOINTMENTS.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <DataTable
      columns={appointmentColumns}
      data={paginatedData}
      keyExtractor={(appt) => appt.id}
      totalItems={24}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      onPageChange={setCurrentPage}
      emptyMessage="No se encontraron citas."
    />
  );
};

export default AppointmentsTable;
