import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar/SideBar";
import DashboardHeader from "../components/SideBar/Dashboardheader";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="ml-[220px] flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
