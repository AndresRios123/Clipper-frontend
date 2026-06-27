import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar/SideBar";
import DashboardHeader from "../components/SideBar/Dashboardheader";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        <main className="flex-1 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
