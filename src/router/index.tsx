import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Calendar from "../pages/Calendar";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Navigate to="/register" replace /> },
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
        ],
      },
    ],
  },
]);
