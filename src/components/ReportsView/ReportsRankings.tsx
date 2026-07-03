import { Star, Scissors } from "lucide-react";

const topEmployees = [
  { name: "Carlos Ruiz", role: "Barbero", services: 98, revenue: 4250000, rating: 4.8 },
  { name: "Miguel Ángel", role: "Barbero", services: 82, revenue: 3800000, rating: 4.6 },
  { name: "Pedro López", role: "Barbero", services: 45, revenue: 1950000, rating: 4.9 },
  { name: "Juan Ordoñez", role: "Barbero", services: 28, revenue: 1200000, rating: 4.2 },
];

const topServices = [
  { name: "Corte clásico", percentage: 35, revenue: 4357500 },
  { name: "Corte + barba", percentage: 25, revenue: 3112500 },
  { name: "Barba completa", percentage: 18, revenue: 2241000 },
  { name: "Afeitado tradicional", percentage: 12, revenue: 1494000 },
  { name: "Otros", percentage: 10, revenue: 1245000 },
];

const formatPrice = (price: number) => `$${price.toLocaleString("es-CO")}`;

const ReportsRankings = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Empleados con mejor rendimiento */}
      <div className="bg-white rounded-2xl p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-900">Empleados con mejor rendimiento</h3>
        <div className="flex flex-col">
          {topEmployees.map((emp, i) => (
            <div
              key={emp.name}
              className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-b-0"
            >
              <span className="text-sm font-bold text-gray-300 w-5">{i + 1}</span>
              <div className="w-9 h-9 rounded-full bg-[#7883FF] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {emp.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{emp.name}</p>
                <p className="text-xs text-gray-400">{emp.role}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 flex-shrink-0">
                <span className="flex items-center gap-1">
                  <Scissors size={12} className="text-gray-400" />
                  {emp.services}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={12} className="text-amber-400" />
                  {emp.rating}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900 w-24 text-right">
                {formatPrice(emp.revenue)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Servicios más vendidos */}
      <div className="bg-white rounded-2xl p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-900">Servicios más vendidos</h3>
        <div className="flex flex-col gap-3">
          {topServices.map((svc) => (
            <div key={svc.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{svc.name}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {svc.percentage}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#7883FF] transition-all"
                  style={{ width: `${svc.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsRankings;
