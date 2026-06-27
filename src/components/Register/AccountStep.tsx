import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Esquema de validación del paso 1 (datos de cuenta)
const accountSchema = z
  .object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    apellido: z.string().min(1, "El apellido es obligatorio"),
    email: z.string().min(1, "El email es obligatorio").email("Email inválido"),
    contrasena: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    verificarContrasena: z.string().min(1, "Verifica tu contraseña"),
  })
  .refine((data) => data.contrasena === data.verificarContrasena, {
    message: "Las contraseñas no coinciden",
    path: ["verificarContrasena"],
  });

export type AccountFormData = z.infer<typeof accountSchema>;

type AccountStepProps = {
  onSubmitStep: (data: AccountFormData) => void;
};

const AccountStep = ({ onSubmitStep }: AccountStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
  });

  const onSubmit = (data: AccountFormData) => {
    onSubmitStep(data);
  };

  return (
    <div className="w-full h-full bg-[#A2AAFF] flex flex-col justify-center px-10 lg:px-20 py-12">
      {/* Título */}
      <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-8">
        Registrate, es 100%
        <br />
        gratis
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
        {/* Nombre + Apellido */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="nombre"
              {...register("nombre")}
              className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-500 text-sm rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-white"
            />
            {errors.nombre && (
              <p className="text-xs text-red-100 mt-1">
                {errors.nombre.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="apellido"
              {...register("apellido")}
              className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-500 text-sm rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-white"
            />
            {errors.apellido && (
              <p className="text-xs text-red-100 mt-1">
                {errors.apellido.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="email"
            {...register("email")}
            className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-500 text-sm rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-white"
          />
          {errors.email && (
            <p className="text-xs text-red-100 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <input
            type="password"
            placeholder="contraseña"
            {...register("contrasena")}
            className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-500 text-sm rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-white"
          />
          {errors.contrasena && (
            <p className="text-xs text-red-100 mt-1">
              {errors.contrasena.message}
            </p>
          )}
        </div>

        {/* Verificar contraseña */}
        <div>
          <input
            type="password"
            placeholder="verifica tu contraseña"
            {...register("verificarContrasena")}
            className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-500 text-sm rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-white"
          />
          {errors.verificarContrasena && (
            <p className="text-xs text-red-100 mt-1">
              {errors.verificarContrasena.message}
            </p>
          )}
        </div>

        {/* Botón Siguiente */}
        <button
          type="submit"
          className="mt-2 bg-[#7883FF] text-white text-sm font-semibold rounded-full px-6 py-3 hover:bg-[#6670e8] transition-colors"
        >
          Siguiente
        </button>
      </form>
    </div>
  );
};

export default AccountStep;