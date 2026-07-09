// ===============================================
// Dashboardheader.tsx - Encabezado del dashboard
// ===============================================
// Muestra el nombre de la barbería (o del usuario)
// y las iniciales del usuario autenticado, obtenidos
// desde AuthContext en lugar de valores hardcodeados.
// ===============================================

import { useAuth } from "../../context/AuthContext";

const DashboardHeader = () => {
  const { user } = useAuth();

  // Nombre a mostrar: si el usuario tiene barbería (porque es admin
  // y se registró con registerOwner), mostramos el nombre de la
  // barbería. Si no, mostramos el nombre del usuario.
  const displayName = user?.barberia?.nombre || user?.nombre || "Clipper";

  // Iniciales: primera letra del nombre y del apellido (si tiene).
  // Ej: "Juan Pérez" → "JP", "Admin" → "A"
  const initials = (user?.nombre ?? "")
    .split(" ")
    .map((p) => p.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2) || "?";

  return (
    <header className="w-full bg-white px-8 py-4 flex items-center justify-end gap-3 border-b border-border">
      <span className="text-sm font-semibold text-gray-900">
        {displayName}
      </span>
      <div className="w-9 h-9 rounded-full bg-[#2B2B2B] flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs font-semibold">
          {initials}
        </span>
      </div>
    </header>
  );
};

export default DashboardHeader;