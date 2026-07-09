import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm, { type LoginFormData } from "../components/Login/LoginForm";
import LoginInfo from "../components/Login/LoginInfo";

const LoginPage = () => {
  // useAuth() nos da la función login del contexto de autenticación
  const { login } = useAuth();
  // useNavigate() redirige a otra ruta programáticamente
  const navigate = useNavigate();

  // Estados locales para manejar carga y errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // handleSubmit recibe los datos validados del formulario
  const handleSubmit = async (data: LoginFormData) => {
    // Limpiar error anterior antes de un nuevo intento
    setError(null);
    setIsLoading(true);

    try {
      // Llamar al login del AuthContext.
      // El formulario usa "contrasena" (por el schema de Zod),
      // pero el backend espera "password", así que mapeamos el campo.
      await login(data.email, data.contrasena);

      // Si login() no lanzó error, redirigir al dashboard
      navigate("/dashboard", { replace: true });
    } catch (err) {
      // Si la API respondió con error (ej: credenciales incorrectas),
      // mostramos el mensaje al usuario
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Panel izquierdo — formulario */}
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />

      {/* Panel derecho — info */}
      <LoginInfo />
    </div>
  );
};

export default LoginPage;