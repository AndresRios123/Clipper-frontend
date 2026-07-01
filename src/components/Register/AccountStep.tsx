import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

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
    <div className="w-full h-full bg-[#A2AAFF] flex flex-col justify-center px-6 lg:px-20 py-20 md:py-12">
      {/* Título */}
      <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-2">
        Registrate, es 100%
        <br />
        gratis
      </h2>
      <p className="text-sm text-white/80 mb-8">
        Crea tu cuenta y empieza a gestionar tu negocio.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
        {/* Nombre + Apellido */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-xs font-semibold mb-1">
              Nombre
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={16} />
              </span>
              <input
                type="text"
                placeholder="tu nombre"
                {...register("nombre")}
                className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-400 text-sm rounded-lg pl-9 pr-4 py-3 outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            {errors.nombre && (
              <p className="text-xs text-red-100 mt-1">
                {errors.nombre.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-white text-xs font-semibold mb-1">
              Apellido
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={16} />
              </span>
              <input
                type="text"
                placeholder="tu apellido"
                {...register("apellido")}
                className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-400 text-sm rounded-lg pl-9 pr-4 py-3 outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            {errors.apellido && (
              <p className="text-xs text-red-100 mt-1">
                {errors.apellido.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
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
              placeholder="tucorreo@ejemplo.com"
              {...register("email")}
              className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-400 text-sm rounded-lg pl-9 pr-4 py-3 outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-100 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-white text-xs font-semibold mb-1">
            Contraseña
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={16} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="mínimo 8 caracteres"
              {...register("contrasena")}
              className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-400 text-sm rounded-lg pl-9 pr-10 py-3 outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.contrasena && (
            <p className="text-xs text-red-100 mt-1">
              {errors.contrasena.message}
            </p>
          )}
        </div>

        {/* Verificar contraseña */}
        <div>
          <label className="block text-white text-xs font-semibold mb-1">
            Verificar contraseña
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={16} />
            </span>
            <input
              type={showVerifyPassword ? "text" : "password"}
              placeholder="repite tu contraseña"
              {...register("verificarContrasena")}
              className="w-full bg-[#E6E6E6] text-gray-800 placeholder-gray-400 text-sm rounded-lg pl-9 pr-10 py-3 outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="button"
              onClick={() => setShowVerifyPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showVerifyPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
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