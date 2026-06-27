import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-[#939CFF] px-6 md:px-10 py-6 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
      {/* Logo */}
      <div className="flex-shrink-0 flex items-center gap-2">
        <svg
          width="30"
          height="30"
          viewBox="0 0 123 127"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(0,127) scale(0.1,-0.1)" fill="white" stroke="none">
            <path d="M530 1109 c-211 -31 -353 -174 -397 -398 -14 -70 -15 -96 -5 -163 6 -43 21 -100 32 -125 19 -44 21 -45 34 -27 7 10 62 98 122 194 59 96 122 188 139 203 49 45 109 57 292 57 182 0 213 7 271 63 46 44 74 101 76 156 l1 46 -255 1 c-140 1 -280 -2 -310 -7z" />
            <path d="M387 508 c-8 -13 -43 -68 -77 -122 l-62 -100 34 -28 c55 -46 144 -88 215 -103 89 -19 314 -20 375 -1 98 29 168 120 168 218 l0 48 -228 0 c-269 0 -311 8 -372 71 l-39 40 -14 -23z" />
          </g>
        </svg>
        <span className="text-white text-xl font-bold">Clipper</span>
      </div>

      {/* Links de navegación - centrados respecto al nav completo (solo desktop) */}
      <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        <li>
          <Link
            to="/"
            className="text-white text-sm font-normal hover:opacity-80 transition-opacity"
          >
            Para quién?
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="text-white text-sm font-normal hover:opacity-80 transition-opacity"
          >
            Servicios
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="text-white text-sm font-normal hover:opacity-80 transition-opacity"
          >
            Precios
          </Link>
        </li>
      </ul>

      {/* Acciones (solo desktop) */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          to="/login"
          className="text-white text-sm font-normal hover:opacity-80 transition-opacity"
        >
          Ir a mi cuenta
        </Link>
        <Link
          to="/register"
          className="bg-white text-gray-900 text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors inline-block"
        >
          Registrate
        </Link>
      </div>

      {/* Botón hamburguesa (solo mobile) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menú"
        className="md:hidden flex items-center justify-center"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6h16M4 12h16M4 18h16"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Overlay oscuro de fondo (solo mobile, cuando el drawer está abierto) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Drawer lateral (solo mobile) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#939CFF] z-50 flex flex-col gap-6 p-6 transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar menú"
          className="self-end flex items-center justify-center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Links */}
        <ul className="flex flex-col gap-5">
          <li>
            <Link
              to="/"
              className="text-white text-base font-normal hover:opacity-80 transition-opacity"
            >
              Para quién?
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="text-white text-base font-normal hover:opacity-80 transition-opacity"
            >
              Servicios
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="text-white text-base font-normal hover:opacity-80 transition-opacity"
            >
              Precios
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-white text-base font-normal hover:opacity-80 transition-opacity"
            >
              Ir a mi cuenta
            </Link>
          </li>
        </ul>

        {/* Botón Registrate */}
        <Link
          to="/register"
          className="bg-white text-gray-900 text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors w-full text-center"
        >
          Registrate
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;