import { useState } from "react";
import { Share2, CalendarPlus, Check } from "lucide-react";
import CalendarView from "../components/Calendarview/Calendarview";
import MetricCard from "../components/Calendarview/Metriccard";
import TopServicesCard from "../components/Calendarview/Topservicescard";

const today = new Date();
const hour = today.getHours();
const greeting =
  hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches";

const dayName = today.toLocaleDateString("es-ES", { weekday: "long" });
const dayNumber = today.getDate();
const monthName = today.toLocaleDateString("es-ES", { month: "long" });
const formattedDate = `${dayName}, ${dayNumber} de ${monthName}`;

const Calendar = () => {
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
      {/* Header: saludo + fecha + enlace */}
      <div className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">{formattedDate}</p>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            {greeting}, Barbería Clipper
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Aquí tienes un resumen de tu jornada.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
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

      {/* Calendario semanal */}
      <CalendarView />

      {/* Fila de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          label="Ingresos del mes"
          value="$550,000"
          changePercentage={10}
        />
        <MetricCard
          label="Citas completadas"
          value="60"
          changePercentage={12}
        />
        <TopServicesCard
          services={[
            { name: "Corte clásico", percentage: 45 },
            { name: "Barba", percentage: 30 },
            { name: "Corte + Barba", percentage: 25 },
          ]}
        />
      </div>
    </div>
  );
};

export default Calendar;
