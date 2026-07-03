import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";

type Range = "today" | "week" | "month" | "year" | "custom";

const RANGES: { key: Range; label: string }[] = [
  { key: "today", label: "Hoy" },
  { key: "week", label: "Esta semana" },
  { key: "month", label: "Este mes" },
  { key: "year", label: "Este año" },
  { key: "custom", label: "Personalizado" },
];

const ReportsHeader = () => {
  const [activeRange, setActiveRange] = useState<Range>("month");

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reportes</h1>
          <p className="text-sm text-gray-500 mt-1">
            Analiza el rendimiento de tu negocio con datos históricos.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {RANGES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveRange(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeRange === key
                  ? "bg-[#7883FF]/10 border border-[#7883FF] text-[#7883FF]"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Calendar size={15} />
            <ChevronDown size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsHeader;
