import { Calendar, Bell, Users, BarChart3 } from "lucide-react";
import type { ReactNode } from "react";

type Feature = {
  icon: ReactNode;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: <Calendar size={20} className="text-white" />,
    title: "Agenda online",
    description: "Tus clientes reservan cuando quieren, sin llamadas ni preguntas",
  },
  {
    icon: <Bell size={20} className="text-white" />,
    title: "Recordatorios automáticos",
    description: "Menos cancelaciones y olvidos. Más clientes felices.",
  },
  {
    icon: <Users size={20} className="text-white" />,
    title: "Gestión de empleados",
    description: "Asigna horarios, servicios y comisiones fácilmente.",
  },
  {
    icon: <BarChart3 size={20} className="text-white" />,
    title: "Reportes de ventas",
    description: "Conoce tus ingresos, servicios más vendidos y mucho más",
  },
];

const RegisterInfo = () => {
  return (
    <div className="w-full h-full bg-white flex flex-col justify-center px-10 lg:px-20 py-12">
      {/* Título */}
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
        Gestiona tu negocio
        <br />
        desde un solo lugar.
      </h1>
      <p className="text-sm text-gray-500 mb-8 leading-snug">
        Todo lo que necesitas para administrar tu barbería
        <br />
        en una sola plataforma.
      </p>

      {/* Lista de features */}
      <ul className="flex flex-col gap-6">
        {features.map((feature) => (
          <li key={feature.title} className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#AEB5FF] flex items-center justify-center">
              {feature.icon}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{feature.title}</p>
              <p className="text-sm text-gray-500 leading-snug">
                {feature.description}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Mockup */}
      <div className="mt-10 flex justify-center">
        <img
          src="/mockups.png"
          alt="Mockup de Clipper"
          className="w-full max-w-[340px] lg:max-w-[380px]"
        />
      </div>
    </div>
  );
};

export default RegisterInfo;