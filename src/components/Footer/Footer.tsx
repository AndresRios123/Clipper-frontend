import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

type FooterColumn = {
  title: string;
  links: string[];
};

const footerColumns: FooterColumn[] = [
  {
    title: "Producto",
    links: ["Para quién?", "Servicios", "Precios"],
  },
  {
    title: "Empresa",
    links: ["Sobre nosotros", "Blog", "Contacto"],
  },
  {
    title: "Soporte",
    links: ["Centro de ayuda", "Preguntas frecuentes", "Estado del servicio"],
  },
];

const socialLinks = [
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaFacebook, label: "Facebook", href: "#" },
  { icon: FaLinkedin, label: "LinkedIn", href: "#" },
  { icon: FaXTwitter, label: "Twitter / X", href: "#" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#00042C] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        {/* Fila superior: logo + descripción | columnas de links */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Logo + descripción */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <svg
                width="26"
                height="26"
                viewBox="0 0 123 127"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  transform="translate(0,127) scale(0.1,-0.1)"
                  fill="white"
                  stroke="none"
                >
                  <path d="M530 1109 c-211 -31 -353 -174 -397 -398 -14 -70 -15 -96 -5 -163 6 -43 21 -100 32 -125 19 -44 21 -45 34 -27 7 10 62 98 122 194 59 96 122 188 139 203 49 45 109 57 292 57 182 0 213 7 271 63 46 44 74 101 76 156 l1 46 -255 1 c-140 1 -280 -2 -310 -7z" />
                  <path d="M387 508 c-8 -13 -43 -68 -77 -122 l-62 -100 34 -28 c55 -46 144 -88 215 -103 89 -19 314 -20 375 -1 98 29 168 120 168 218 l0 48 -228 0 c-269 0 -311 8 -372 71 l-39 40 -14 -23z" />
                </g>
              </svg>
              <span className="text-xl font-bold">Clipper</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              La forma más simple de gestionar tu negocio: agenda, clientes,
              empleados y ventas, todo en un solo lugar.
            </p>
          </div>

          {/* Columnas de links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 flex-1 md:max-w-xl">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-white mb-4">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-white/10 my-10" />

        {/* Fila inferior: copyright + legal + redes sociales */}
        <div className="flex flex-col-reverse md:flex-row items-center md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <p className="text-sm text-white/50">
              © {year} Clipper. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                Términos
              </a>
              <a
                href="#"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                Privacidad
              </a>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;