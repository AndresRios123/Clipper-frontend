import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.string().min(1, "El email es obligatorio").email("Email inválido"),
  contrasena: z.string().min(1, "La contraseña es obligatoria"),
  recordarme: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

type LoginFormProps = {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
  error?: string | null;
};

const LoginForm = ({ onSubmit, isLoading = false, error }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="w-full h-full bg-[#A2AAFF] flex flex-col justify-center px-6 lg:px-20 py-20 md:py-12">
      {/* Título */}
      <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-2">
        Iniciar sesión
      </h2>
      <p className="text-sm text-white/80 mb-8">
        Ingresa tus credenciales para acceder a tu cuenta.
      </p>

      {/* Mensaje de error (si hay) */}
      {error && (
        <div className="bg-red-400/20 border border-red-400/40 text-white text-sm rounded-lg px-4 py-2.5">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
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
          <div className="flex justify-between items-center mb-1">
            <label className="text-white text-xs font-semibold">
              Contraseña
            </label>
            <button
              type="button"
              className="text-xs text-white/80 hover:text-white transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={16} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="contraseña"
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

        {/* Recordarme */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("recordarme")}
            className="w-3.5 h-3.5 accent-[#7883FF] rounded"
          />
          <span className="text-xs text-white">Recordarme</span>
        </label>

        {/* Botón */}
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-2 text-white text-sm font-semibold rounded-full px-6 py-3 transition-colors ${
            isLoading
              ? "bg-[#7883FF]/60 cursor-not-allowed"
              : "bg-[#7883FF] hover:bg-[#6670e8]"
          }`}
        >
          {isLoading ? "Iniciando sesión…" : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;