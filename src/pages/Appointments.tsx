import AppointmentsHeader from "../components/AppointmentsView/AppointmentsHeader";
import AppointmentsListSection from "../components/AppointmentsView/AppointmentsListSection";

const Appointments = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <AppointmentsHeader />
      <AppointmentsListSection />
    </div>
  );
};

export default Appointments;
