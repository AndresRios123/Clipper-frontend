import EmployeesHeader from "../components/EmployeesView/EmployeesHeader";
import EmployeesListSection from "../components/EmployeesView/EmployeesListSection";

const Employees = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <EmployeesHeader />
      <EmployeesListSection />
    </div>
  );
};

export default Employees;
