import EmployeeCard from "./EmployeeCard";
import type { Employee } from "./EmployeeCard";
import type { EmployeeCategory } from "./EmployeeFilterBar";

const SAMPLE_EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Carlos Ruiz",
    role: "barber",
    roleLabel: "Barbero",
    status: "active",
    phone: "+57 300 123 4567",
    email: "carlos.ruiz@clipper.com",
    hireDate: "15 ene 2024",
    documentId: "CC 1.234.567",
    stats: { appointmentsAttended: 342, averageRating: 4.8, servicesPerformed: 510, monthlyRevenue: 4250000 },
  },
  {
    id: "2",
    name: "Miguel Ángel",
    role: "barber",
    roleLabel: "Barbero",
    status: "active",
    phone: "+57 300 234 5678",
    email: "miguel.angel@clipper.com",
    hireDate: "3 mar 2024",
    documentId: "CC 2.345.678",
    stats: { appointmentsAttended: 289, averageRating: 4.6, servicesPerformed: 430, monthlyRevenue: 3800000 },
  },
  {
    id: "3",
    name: "Laura Gómez",
    role: "receptionist",
    roleLabel: "Recepcionista",
    status: "active",
    phone: "+57 300 345 6789",
    email: "laura.gomez@clipper.com",
    hireDate: "20 feb 2024",
    documentId: "CC 3.456.789",
    stats: { appointmentsAttended: 0, averageRating: 0, servicesPerformed: 0, monthlyRevenue: 0 },
  },
  {
    id: "4",
    name: "Andrés Martínez",
    role: "admin",
    roleLabel: "Administrador",
    status: "active",
    phone: "+57 300 456 7890",
    email: "andres.martinez@clipper.com",
    hireDate: "1 dic 2023",
    documentId: "CC 4.567.890",
    stats: { appointmentsAttended: 0, averageRating: 0, servicesPerformed: 0, monthlyRevenue: 0 },
  },
  {
    id: "5",
    name: "Pedro López",
    role: "barber",
    roleLabel: "Barbero",
    status: "vacation",
    phone: "+57 300 567 8901",
    email: "pedro.lopez@clipper.com",
    hireDate: "10 jun 2024",
    documentId: "CC 5.678.901",
    stats: { appointmentsAttended: 156, averageRating: 4.9, servicesPerformed: 220, monthlyRevenue: 1950000 },
  },
  {
    id: "6",
    name: "Sofía Ramírez",
    role: "receptionist",
    roleLabel: "Recepcionista",
    status: "active",
    phone: "+57 300 678 9012",
    email: "sofia.ramirez@clipper.com",
    hireDate: "5 abr 2024",
    documentId: "CC 6.789.012",
    stats: { appointmentsAttended: 0, averageRating: 0, servicesPerformed: 0, monthlyRevenue: 0 },
  },
  {
    id: "7",
    name: "Juan Ordoñez",
    role: "barber",
    roleLabel: "Barbero",
    status: "inactive",
    phone: "+57 300 789 0123",
    email: "juan.ordonez@clipper.com",
    hireDate: "22 jul 2023",
    documentId: "CC 7.890.123",
    stats: { appointmentsAttended: 98, averageRating: 4.2, servicesPerformed: 145, monthlyRevenue: 1200000 },
  },
  {
    id: "8",
    name: "María Torres",
    role: "admin",
    roleLabel: "Administrador",
    status: "active",
    phone: "+57 300 890 1234",
    email: "maria.torres@clipper.com",
    hireDate: "15 sep 2023",
    documentId: "CC 8.901.234",
    stats: { appointmentsAttended: 0, averageRating: 0, servicesPerformed: 0, monthlyRevenue: 0 },
  },
];

type EmployeeCardGridProps = {
  activeCategory: EmployeeCategory;
  selectedEmployeeId: string | null;
  onSelectEmployee: (employee: Employee) => void;
};

const EmployeeCardGrid = ({ activeCategory, selectedEmployeeId, onSelectEmployee }: EmployeeCardGridProps) => {
  const filtered =
    activeCategory === "Todos"
      ? SAMPLE_EMPLOYEES
      : SAMPLE_EMPLOYEES.filter((e) => {
          switch (activeCategory) {
            case "Barberos": return e.role === "barber";
            case "Recepcionistas": return e.role === "receptionist";
            case "Administradores": return e.role === "admin";
            case "Inactivos": return e.status === "inactive";
            default: return true;
          }
        });

  if (filtered.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-12">
        No hay empleados en esta categoría.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {filtered.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          isSelected={selectedEmployeeId === employee.id}
          onSelect={onSelectEmployee}
        />
      ))}
    </div>
  );
};

export default EmployeeCardGrid;
