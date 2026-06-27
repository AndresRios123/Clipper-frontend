import {
  CalendarDays,
  ClipboardList,
  UserPlus,
  Tag,
  UserCog,
  BarChart3,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type NavItem = {
  icon: ReactNode;
  label: string;
  to: string;
};

const navItems: NavItem[] = [
  { icon: <CalendarDays size={20} />, label: "Calendario", to: "/calendar" },
  { icon: <ClipboardList size={20} />, label: "Citas", to: "/dashboard" },
  { icon: <UserPlus size={20} />, label: "Clientes", to: "/dashboard" },
  { icon: <Tag size={20} />, label: "Servicios", to: "/dashboard" },
  { icon: <UserCog size={20} />, label: "Empleados", to: "/dashboard" },
  { icon: <BarChart3 size={20} />, label: "Reportes", to: "/dashboard" },
];

const Sidebar = () => {
  return (
    <aside className="w-[220px] h-screen bg-[#00042C] flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-6">
        <svg
          width="24"
          height="24"
          viewBox="0 0 123 127"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(0,127) scale(0.1,-0.1)" fill="white" stroke="none">
            <path d="M530 1109 c-211 -31 -353 -174 -397 -398 -14 -70 -15 -96 -5 -163 6 -43 21 -100 32 -125 19 -44 21 -45 34 -27 7 10 62 98 122 194 59 96 122 188 139 203 49 45 109 57 292 57 182 0 213 7 271 63 46 44 74 101 76 156 l1 46 -255 1 c-140 1 -280 -2 -310 -7z" />
            <path d="M387 508 c-8 -13 -43 -68 -77 -122 l-62 -100 34 -28 c55 -46 144 -88 215 -103 89 -19 314 -20 375 -1 98 29 168 120 168 218 l0 48 -228 0 c-269 0 -311 8 -372 71 l-39 40 -14 -23z" />
          </g>
        </svg>
        <span className="text-white text-lg font-bold">Clipper</span>
      </div>

      {/* Navegación principal */}
      <nav className="flex-1 px-4 mt-4">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white text-sm font-medium hover:bg-white/10 transition-colors"
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Ajustes (anclado al fondo) */}
      <div className="px-4 pb-6">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white text-sm font-medium hover:bg-white/10 transition-colors"
        >
          <Settings size={20} />
          Ajustes
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;