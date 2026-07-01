import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Store, MapPin, Phone, Mail } from "lucide-react";

// Esquema de validación del paso 2 (datos de la barbería)
const barbershopSchema = z.object({
  nombreBarberia: z.string().min(1, "El nombre de la barbería es obligatorio"),
  direccion: z.string().min(1, "La dirección es obligatoria"),
  telefono: z
    .string()
    .min(1, "El teléfono es obligatorio")
    .regex(/^[0-9+\s-]+$/, "Teléfono inválido"),
  emailBarberia: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Email inválido"),
});

export type BarbershopFormData = z.infer<typeof barbershopSchema>;

type BarbershopStepProps = {
  onSubmitStep: (data: BarbershopFormData) => void;
  onBack: () => void;
};

const BarbershopStep = ({ onSubmitStep, onBack }: BarbershopStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BarbershopFormData>({
    resolver: zodResolver(barbershopSchema),
  });

  const onSubmit = (data: BarbershopFormData) => {
    onSubmitStep(data);
  };

  return (
    <div className="w-full h-full bg-[#A2AAFF] flex flex-col justify-center px-6 lg:px-20 py-20 md:py-12">
      {/* Título */}
      <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-2">
        Cuéntanos de
        <br />
        tu barbería
      </h2>
      <p className="text-sm text-white/80 mb-8">
        Los datos de tu negocio para que tus clientes te encuentren.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
        {/* Nombre de la barbería */}
        <div>
          <label className="block text-white text-xs font-semibold mb-1">
            Nombre de la barbería
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Store size={16} />
            </span>
            <input
              type="text"
              placeholder="ej: Clipper Barber Shop"
              {...register("nombreBarberia")}
              className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-400 text-sm rounded-lg pl-9 pr-4 py-3 outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          {errors.nombreBarberia && (
            <p className="text-xs text-red-100 mt-1">
              {errors.nombreBarberia.message}
            </p>
          )}
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-white text-xs font-semibold mb-1">
            Dirección
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MapPin size={16} />
            </span>
            <input
              type="text"
              placeholder="calle, número, colonia"
              {...register("direccion")}
              className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-400 text-sm rounded-lg pl-9 pr-4 py-3 outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          {errors.direccion && (
            <p className="text-xs text-red-100 mt-1">
              {errors.direccion.message}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-white text-xs font-semibold mb-1">
            Teléfono
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Phone size={16} />
            </span>
            <input
              type="tel"
              placeholder="+52 55 1234 5678"
              {...register("telefono")}
              className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-400 text-sm rounded-lg pl-9 pr-4 py-3 outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          {errors.telefono && (
            <p className="text-xs text-red-100 mt-1">
              {errors.telefono.message}
            </p>
          )}
        </div>

        {/* Email de la barbería */}
        <div>
          <label className="block text-white text-xs font-semibold mb-1">
            Email
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail size={16} />
            </span>
            <input
              type="email"
              placeholder="barberia@ejemplo.com"
              {...register("emailBarberia")}
              className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-400 text-sm rounded-lg pl-9 pr-4 py-3 outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          {errors.emailBarberia && (
            <p className="text-xs text-red-100 mt-1">
              {errors.emailBarberia.message}
            </p>
          )}
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-3 mt-2">
          <button
            type="button"
            onClick={onBack}
            className="text-white text-sm font-medium px-4 py-3 hover:opacity-80 transition-opacity"
          >
            Atrás
          </button>
          <button
            type="submit"
            className="flex-1 bg-[#7883FF] text-white text-sm font-semibold rounded-full px-6 py-3 hover:bg-[#6670e8] transition-colors"
          >
            Finalizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BarbershopStep;