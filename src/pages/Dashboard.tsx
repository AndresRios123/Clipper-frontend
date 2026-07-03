import DashboardHeader from "../components/DashboardView/DashboardHeader";
import DashboardUpcoming from "../components/DashboardView/DashboardUpcoming";
import DashboardActivity from "../components/DashboardView/DashboardActivity";

const Dashboard = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <DashboardHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardUpcoming />
        <DashboardActivity />
      </div>
    </div>
  );
};

export default Dashboard;
