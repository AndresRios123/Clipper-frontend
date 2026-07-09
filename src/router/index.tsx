// ===============================================
// router/index.tsx - Definición de rutas
// ===============================================
// Estructura:
//
//   /           → redirige a /login (o a /dashboard
//                 si ya hay sesión, lo maneja PublicRoute)
//   /login      → página de inicio de sesión
//   /register   → página de registro (dueño + barbería)
//   /dashboard  → protegida (requiere auth)
//   /calendar   → protegida
//   /citas      → protegida
//   /clientes   → protegida
//   /servicios  → protegida
//   /empleados  → protegida
//   /reportes   → protegida
//   /ajustes    → protegida
//
// Las rutas protegidas están envueltas en ProtectedRoute.
// Las rutas públicas (login/register) están envueltas en
// PublicRoute que redirige a /dashboard si ya hay sesión.
// ===============================================

import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute, { PublicRoute, RootRedirect } from "../components/ProtectedRoute";
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
      // Ruta raíz: redirige en un solo paso según la sesión.
      // RootRedirect evalúa isAuthenticated y manda directo a
      // /dashboard (con sesión) o /login (sin sesión).
      { index: true, element: <RootRedirect /> },

      // ---- Rutas públicas (solo accesibles sin sesión) ----
      {
        // PublicRoute: si el usuario YA está logueado, redirige
        // a /dashboard automáticamente
        element: <PublicRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { path: "register", element: <Register /> },
              { path: "login", element: <Login /> },
            ],
          },
        ],
      },

      // ---- Rutas protegidas (requieren autenticación) ----
      {
        // ProtectedRoute: si NO hay sesión, redirige a /login
        element: <ProtectedRoute />,
        children: [
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
    ],
  },
]);
