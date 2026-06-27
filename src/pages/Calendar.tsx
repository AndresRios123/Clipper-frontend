import CalendarView from "../components/Calendarview/Calendarview";
import MetricCard from "../components/Calendarview/Metriccard";
import TopServicesCard from "../components/Calendarview/Topservicescard";

const Calendar = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
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