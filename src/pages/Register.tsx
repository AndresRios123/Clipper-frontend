import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RegisterInfo from "../components/Register/RegisterInfo";
import RegisterForm, {
  type RegisterFormData,
} from "../components/Register/RegisterForm";

const Register = () => {
  const { registerOwner } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async (data: RegisterFormData) => {
    if (!data.account || !data.barbershop) return;

    setError(null);
    setIsLoading(true);

    try {
      // El backend espera registerOwner con esta estructura:
      // { nombre, email, password, barberia: { nombre, direccion, telefono, email } }
      // El formulario separa datos en account (nombre+apellido, email, contrasena)
      // y barbershop (nombreBarberia, direccion, telefono, emailBarberia).
      // Mapeamos los campos para que coincidan con lo que espera el backend.
      await registerOwner({
        nombre: `${data.account.nombre} ${data.account.apellido}`.trim(),
        email: data.account.email,
        password: data.account.contrasena,
        barberia: {
          nombre: data.barbershop.nombreBarberia,
          direccion: data.barbershop.direccion,
          telefono: data.barbershop.telefono,
          email: data.barbershop.emailBarberia,
        },
      });

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrarse");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <RegisterInfo />

      {/* Lado derecho: formulario de registro con 2 pasos */}
      <div className="relative flex flex-col">
        {/* Mensaje de error flotante arriba del formulario */}
        {error && (
          <div className="absolute top-4 left-6 right-6 z-10 bg-red-400/20 border border-red-400/40 text-white text-sm rounded-lg px-4 py-2.5">
            {error}
          </div>
        )}
        <RegisterForm onComplete={handleComplete} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Register;
