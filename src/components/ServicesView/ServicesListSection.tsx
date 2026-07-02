import { useState } from "react";
import ServiceCategoryFilter from "./Servicecategoryfilter";
import ServicesGrid from "./Servicesgrid";
import type { ServiceCategory } from "./Servicecategoryfilter";

const ServicesListSection = () => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("Todos");

  return (
    <div className="flex flex-col gap-5">
      <ServiceCategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ServicesGrid activeCategory={activeCategory} />
    </div>
  );
};

export default ServicesListSection;