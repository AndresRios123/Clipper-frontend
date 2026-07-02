import { useState } from "react";
import EmployeeFilterBar from "./EmployeeFilterBar";
import EmployeeCardGrid from "./EmployeeCardGrid";
import EmployeeSidePanel from "./EmployeeSidePanel";
import type { EmployeeCategory } from "./EmployeeFilterBar";
import type { Employee } from "./EmployeeCard";

const EmployeesListSection = () => {
  const [activeCategory, setActiveCategory] = useState<EmployeeCategory>("Todos");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  return (
    <>
      <div className="bg-white rounded-2xl p-6 flex flex-col gap-5">
        <EmployeeFilterBar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <div className="-mx-6 px-6">
          <EmployeeCardGrid
            activeCategory={activeCategory}
            selectedEmployeeId={selectedEmployee?.id ?? null}
            onSelectEmployee={setSelectedEmployee}
          />
        </div>
      </div>

      {selectedEmployee && (
        <EmployeeSidePanel
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </>
  );
};

export default EmployeesListSection;
