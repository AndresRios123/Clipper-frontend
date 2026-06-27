import { useState } from "react";
import RegisterInfo from "../../components/Register/RegisterInfo";
import RegisterForm, { type AccountFormData } from "../../components/Register/RegisterForm";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [accountData, setAccountData] = useState<AccountFormData | null>(null);

  const handleAccountSubmit = (data: AccountFormData) => {
    setAccountData(data);
    setCurrentStep(2);
    // Por ahora solo guardamos los datos y avanzamos el paso.
    // El step 2 (datos de la barbería) se conecta aquí cuando lo construyamos.
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <RegisterInfo />
      <RegisterForm onSubmitStep={handleAccountSubmit} />
    </div>
  );
};

export default Register;