const Navbar = () => {
  return (
    <nav className="w-full bg-[#939CFF] px-10 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex-shrink-0">
        <span className="text-white text-xl font-bold">Clipper</span>
      </div>

      {/* Links de navegación */}
      <ul className="flex items-center gap-8">
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