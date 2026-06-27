const Navbar = () => {
  return (
    <nav className="w-full bg-[#939CFF] px-10 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <div className="flex-shrink-0 flex items-center gap-2">
        <svg
          width="20"
          height="20"
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

      {/* Links de navegación - centrados respecto al nav completo */}
      <ul className="flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        <li>
          <a
            href="#"
            className="text-white text-sm font-normal hover:opacity-80 transition-opacity"
          >
            Para quién?
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-white text-sm font-normal hover:opacity-80 transition-opacity"
          >
            Servicios
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-white text-sm font-normal hover:opacity-80 transition-opacity"
          >
            Precios
          </a>
        </li>
      </ul>

      {/* Acciones */}
      <div className="flex items-center gap-6">
        <a
          href="#"
          className="text-white text-sm font-normal hover:opacity-80 transition-opacity"
        >
          Ir a mi cuenta
        </a>
        <button
          type="button"
          className="bg-white text-gray-900 text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          Registrate
        </button>
      </div>
    </nav>
  );
};

export default Navbar;