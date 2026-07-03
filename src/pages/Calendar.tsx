import { useState } from "react";
import { Share2, CalendarPlus, Check } from "lucide-react";
import CalendarView from "../components/Calendarview/Calendarview";

const Calendar = () => {
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [copied, setCopied] = useState(false);
  const bookingLink = "https://clipper.agenda.com/mi-barberia";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(bookingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("No se pudo copiar el enlace");
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendario</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona visualmente la agenda de tu negocio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Vista: Semana / Mes */}
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("week")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === "week" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Semana
            </button>
            <button
              type="button"
              onClick={() => setViewMode("month")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === "month" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Mes
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className={`flex items-center justify-center gap-2 border text-sm font-semibold rounded-full px-5 py-2.5 transition-all ${
              copied
                ? "border-green-500 text-green-600 bg-green-50"
                : "border-clipper text-clipper hover:bg-clipper hover:text-white"
            }`}
          >
            {copied ? (
              <>
                <Check size={16} />
                ¡Copiado!
              </>
            ) : (
              <>
                <Share2 size={16} />
                Compartir agenda
              </>
            )}
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-clipper text-white text-sm font-semibold rounded-full px-5 py-2.5 hover:bg-[#6670e8] transition-colors"
          >
            <CalendarPlus size={16} />
            Nueva cita
          </button>
        </div>
      </div>

      {/* Calendario */}
      <CalendarView />
    </div>
  );
};

export default Calendar;
