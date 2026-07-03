import { Users, UserCheck, UserX, TrendingUp } from "lucide-react";

const StatsRankings = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-2xl p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#BFBDED] flex items-center justify-center flex-shrink-0">
          <Users size={16} style={{ color: "#723AF3" }} />
        </div>
        <div>
          <p className="text-xs text-gray-500">Nuevos clientes</p>
          <p className="text-lg font-bold text-gray-900">42</p>
          <p className="text-xs text-green-600 font-medium">+22% vs mes anterior</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#C3E2CC] flex items-center justify-center flex-shrink-0">
          <UserCheck size={16} style={{ color: "#0C7D31" }} />
        </div>
        <div>
          <p className="text-xs text-gray-500">Clientes recurrentes</p>
          <p className="text-lg font-bold text-gray-900">128</p>
          <p className="text-xs text-green-600 font-medium">68% del total</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#E9CB93] flex items-center justify-center flex-shrink-0">
          <UserX size={16} style={{ color: "#B57600" }} />
        </div>
        <div>
          <p className="text-xs text-gray-500">Clientes inactivos</p>
          <p className="text-lg font-bold text-gray-900">18</p>
          <p className="text-xs text-amber-600 font-medium">10% del total</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#BFDBFE] flex items-center justify-center flex-shrink-0">
          <TrendingUp size={16} style={{ color: "#2563EB" }} />
        </div>
        <div>
          <p className="text-xs text-gray-500">Tasa retención</p>
          <p className="text-lg font-bold text-gray-900">87%</p>
          <p className="text-xs text-green-600 font-medium">+5% vs mes anterior</p>
        </div>
      </div>
    </div>
  );
};

export default StatsRankings;
