import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
    <div className="w-full h-full bg-[#A2AAFF] flex flex-col justify-center px-10 lg:px-20 py-12">
      {/* Título */}
      <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-8">
        Cuéntanos de
        <br />
        tu barbería
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
        {/* Nombre de la barbería */}
        <div>
          <input
            type="text"
            placeholder="nombre de la barbería"
            {...register("nombreBarberia")}
            className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-500 text-sm rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-white"
          />
          {errors.nombreBarberia && (
            <p className="text-xs text-red-100 mt-1">
              {errors.nombreBarberia.message}
            </p>
          )}
        </div>

        {/* Dirección */}
        <div>
          <input
            type="text"
            placeholder="dirección"
            {...register("direccion")}
            className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-500 text-sm rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-white"
          />
          {errors.direccion && (
            <p className="text-xs text-red-100 mt-1">
              {errors.direccion.message}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <input
            type="tel"
            placeholder="teléfono"
            {...register("telefono")}
            className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-500 text-sm rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-white"
          />
          {errors.telefono && (
            <p className="text-xs text-red-100 mt-1">
              {errors.telefono.message}
            </p>
          )}
        </div>

        {/* Email de la barbería */}
        <div>
          <input
            type="email"
            placeholder="email"
            {...register("emailBarberia")}
            className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-500 text-sm rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-white"
          />
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