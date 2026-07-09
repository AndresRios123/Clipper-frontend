// ===============================================
// ProtectedRoute.tsx - Protege rutas del dashboard
// ===============================================
// Este componente se pone ENCIMA de las rutas que
// requieren autenticación. Si el usuario NO tiene
// sesión, lo redirige a /login automáticamente.
// Si está autenticado, renderiza la ruta hija.
//
// Se usa junto con createBrowserRouter:
//   {
//     element: <ProtectedRoute />,
//     children: [
//       { path: "dashboard", element: <Dashboard /> },
//       ...
//     ],
//   }
// ===============================================

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  // useAuth() nos da acceso reactivo al estado de autenticación.
  // Si el usuario llama a logout(), isAuthenticated cambia a false
  // INMEDIATAMENTE y esto redirige sin necesidad de recargar.
  const { isAuthenticated } = useAuth();

  // Si NO está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderiza la ruta que va dentro
  // (Outlet es el hijo del route layout en createBrowserRouter)
  return <Outlet />;
};

// ===============================================
// PublicRoute - Solo accesible si NO hay sesión
// ===============================================
// Es lo opuesto a ProtectedRoute. Si el usuario YA
// está logueado y visita /login o /register, lo
// redirige a /dashboard para que no vea la pantalla
// de login estando ya autenticado.
// ===============================================

export const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  // Si ya hay sesión, redirige al dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
