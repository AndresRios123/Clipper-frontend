import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar/SideBar";
import DashboardHeader from "../components/SideBar/Dashboardheader";
import { SidebarProvider } from "../components/SideBar/Sidebarcontext";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 bg-dashboard overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
