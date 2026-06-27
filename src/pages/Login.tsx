import LoginForm, { type LoginFormData } from "../components/Login/LoginForm";
import LoginInfo from "../components/Login/LoginInfo"

const LoginPage = () => {
  const handleSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
    // Aquí va tu lógica de autenticación
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Panel izquierdo — formulario */}
      <LoginForm onSubmit={handleSubmit} />

      {/* Panel derecho — info */}
      <LoginInfo />
    </div>
  );
};

export default LoginPage;