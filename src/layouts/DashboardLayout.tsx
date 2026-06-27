import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar/SideBar";
import DashboardHeader from "../components/SideBar/Dashboardheader";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <DashboardHeader />
        <main className="flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
