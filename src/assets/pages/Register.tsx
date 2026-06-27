import RegisterInfo from "../../components/Register/RegisterInfo";
import RegisterForm, {
  type RegisterFormData,
} from "../../components/Register/RegisterForm";

const Register = () => {
  const handleComplete = (data: RegisterFormData) => {
    console.log("Registro completo:", data);
    // Aquí se conectará la llamada al backend (API) cuando esté lista.
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <RegisterInfo />
      <RegisterForm onComplete={handleComplete} />
    </div>
  );
};

export default Register;