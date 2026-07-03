import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Calendar from "../pages/Calendar";
import Appointments from "../pages/Appointments";
import Clients from "../pages/Clients";
import Services from "../pages/Services";
import Employees from "../pages/Employees";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      {
        element: <AuthLayout />,
        children: [
          { path: "register", element: <Register /> },
          { path: "login", element: <Login /> },
        ],
      },
      {
        element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "calendar", element: <Calendar /> },
          { path: "citas", element: <Appointments /> },
          { path: "clientes", element: <Clients /> },
          { path: "servicios", element: <Services /> },
          { path: "empleados", element: <Employees /> },
          { path: "reportes", element: <Reports /> },
          { path: "ajustes", element: <Settings /> },
        ],
      },
    ],
  },
]);
