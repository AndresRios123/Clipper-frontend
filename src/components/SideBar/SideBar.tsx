import {
  CalendarDays,
  ClipboardList,
  UserPlus,
  Tag,
  UserCog,
  BarChart3,
  Settings,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useSidebar } from "./Sidebarcontext";

type NavItem = {
  icon: ReactNode;
  label: string;
  to: string;
};

const navItems: NavItem[] = [
  { icon: <CalendarDays size={20} />, label: "Calendario", to: "/calendar" },
  { icon: <ClipboardList size={20} />, label: "Citas", to: "/citas" },
  { icon: <UserPlus size={20} />, label: "Clientes", to: "/clientes" },
  { icon: <Tag size={20} />, label: "Servicios", to: "/servicios" },
  { icon: <UserCog size={20} />, label: "Empleados", to: "/empleados" },
  { icon: <BarChart3 size={20} />, label: "Reportes", to: "/reportes" },
];

// Contenido interno del sidebar, compartido entre la versión desktop
// (colapsable) y la versión mobile (drawer superpuesto)
const SidebarContent = ({
  collapsed,
  onLinkClick,
}: {
  collapsed: boolean;
  onLinkClick?: () => void;
}) => {
  const { pathname } = useLocation();
  const listRef = useRef<HTMLUListElement>(null);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [indicatorHeight, setIndicatorHeight] = useState(0);

  const isActivePath = (to: string) => pathname === to;

  useEffect(() => {
    if (collapsed || !listRef.current) {
      return;
    }
    const activeItem = listRef.current.querySelector('[data-active="true"]');
    if (activeItem instanceof HTMLElement) {
      setIndicatorTop(activeItem.offsetTop);
      setIndicatorHeight(activeItem.offsetHeight);
    }
  }, [collapsed, pathname]);

  return (
    <>
      {/* Navegación principal */}
      <nav className="flex-1 px-4 mt-4 relative">
        {/* Indicador deslizante (pill) */}
        {!collapsed && indicatorHeight > 0 && (
          <div
            className="absolute left-4 right-4 bg-white/15 rounded-lg transition-all duration-300 ease-in-out pointer-events-none"
            style={{ top: indicatorTop, height: indicatorHeight }}
          />
        )}

        <ul className="flex flex-col gap-2 relative" ref={listRef}>
          {navItems.map((item) => {
            const active = isActivePath(item.to);
            return (
              <li key={item.label} data-active={active}>
                <NavLink
                  to={item.to}
                  onClick={onLinkClick}
                  end
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    active
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  {active && !collapsed && (
                    <span className="w-2 h-2 rounded-full bg-white flex-shrink-0" />
                  )}
                  {item.icon}
                  {!collapsed && item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Ajustes (anclado al fondo) */}
      <div className="px-4 pb-6">
        <NavLink
          to="/dashboard"
          onClick={onLinkClick}
          end
          title={collapsed ? "Ajustes" : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
            isActivePath("/dashboard")
              ? "bg-white/15 text-white"
              : "text-white/70 hover:bg-white/10 hover:text-white"
          } ${collapsed ? "justify-center" : ""}`}
        >
          {isActivePath("/dashboard") && !collapsed && (
            <span className="w-2 h-2 rounded-full bg-white flex-shrink-0" />
          )}
          <Settings size={20} />
          {!collapsed && "Ajustes"}
        </NavLink>
      </div>
    </>
  );
};

const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 123 127" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0,127) scale(0.1,-0.1)" fill="white" stroke="none">
      <path d="M530 1109 c-211 -31 -353 -174 -397 -398 -14 -70 -15 -96 -5 -163 6 -43 21 -100 32 -125 19 -44 21 -45 34 -27 7 10 62 98 122 194 59 96 122 188 139 203 49 45 109 57 292 57 182 0 213 7 271 63 46 44 74 101 76 156 l1 46 -255 1 c-140 1 -280 -2 -310 -7z" />
      <path d="M387 508 c-8 -13 -43 -68 -77 -122 l-62 -100 34 -28 c55 -46 144 -88 215 -103 89 -19 314 -20 375 -1 98 29 168 120 168 218 l0 48 -228 0 c-269 0 -311 8 -372 71 l-39 40 -14 -23z" />
    </g>
  </svg>
);

const Sidebar = () => {
  const { isCollapsed, toggleCollapsed, isMobileOpen, openMobile, closeMobile } =
    useSidebar();

  return (
    <>
      {/* ---------- Botón flotante (solo mobile, cuando el sidebar está cerrado) ---------- */}
      {!isMobileOpen && (
        <button
          type="button"
          onClick={openMobile}
          aria-label="Abrir menú"
          className="md:hidden fixed top-4 left-4 z-40 w-11 h-11 rounded-full bg-[#00042C] flex items-center justify-center shadow-lg"
        >
          <Menu size={20} className="text-white" />
        </button>
      )}

      {/* ---------- Overlay (solo mobile, cuando el sidebar está abierto) ---------- */}
      {isMobileOpen && (
        <div
          onClick={closeMobile}
          className="md:hidden fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* ---------- Sidebar versión MOBILE (drawer superpuesto) ---------- */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-[240px] bg-[#00042C] flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-6 py-6">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-white text-lg font-bold">Clipper</span>
          </div>
          <button
            type="button"
            onClick={closeMobile}
            aria-label="Cerrar menú"
            className="text-white"
          >
            <X size={20} />
          </button>
        </div>

        <SidebarContent collapsed={false} onLinkClick={closeMobile} />
      </aside>

      {/* ---------- Sidebar versión DESKTOP (colapsable, empuja el contenido) ---------- */}
      <aside
        className={`hidden md:flex h-screen bg-[#00042C] flex-col flex-shrink-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-[72px]" : "w-[220px]"
        }`}
      >
        <div
          className={`flex items-center gap-2 px-6 py-6 ${
            isCollapsed ? "justify-center px-0" : "justify-between"
          }`}
        >
          <div className="flex items-center gap-2">
            <Logo />
            {!isCollapsed && (
              <span className="text-white text-lg font-bold">Clipper</span>
            )}
          </div>

          {!isCollapsed && (
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label="Colapsar menú"
              className="text-white/60 hover:text-white transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </div>

        {/* Cuando está colapsado, la flecha se muestra debajo del logo, centrada y apuntando a la derecha para indicar "expandir" */}
        {isCollapsed && (
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-label="Expandir menú"
            className="text-white/60 hover:text-white transition-colors mx-auto mb-2 rotate-180"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        <SidebarContent collapsed={isCollapsed} />
      </aside>
    </>
  );
};

export default Sidebar;