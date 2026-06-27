import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar/SideBar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
