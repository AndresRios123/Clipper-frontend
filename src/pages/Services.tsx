import ServicesHeader from "../components/ServicesView/ServicesHeader";
import ServicesListSection from "../components/ServicesView/ServicesListSection";

const Services = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <ServicesHeader />
      <ServicesListSection />
    </div>
  );
};

export default Services;
