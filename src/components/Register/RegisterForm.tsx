import { useState } from "react";
import AccountStep, { type AccountFormData } from "./AccountStep";
import BarbershopStep, { type BarbershopFormData } from "./BarbershopStep";

export type RegisterFormData = {
  account: AccountFormData | null;
  barbershop: BarbershopFormData | null;
};

type RegisterFormProps = {
  onComplete: (data: RegisterFormData) => void;
  isLoading?: boolean;
};

const RegisterForm = ({ onComplete, isLoading = false }: RegisterFormProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [accountData, setAccountData] = useState<AccountFormData | null>(null);

  const handleAccountSubmit = (data: AccountFormData) => {
    setAccountData(data);
    setStep(2);
  };

  const handleBarbershopSubmit = (data: BarbershopFormData) => {
    onComplete({ account: accountData, barbershop: data });
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="w-full h-full overflow-hidden relative">
      {/* Pista deslizante: el doble de ancho (2 steps), se mueve con translateX */}
      <div
        className={`flex w-[200%] h-full transition-transform duration-500 ease-in-out ${
          step === 1 ? "translate-x-0" : "-translate-x-1/2"
        }`}
      >
        {/* Step 1 */}
        <div className="w-1/2 h-full flex-shrink-0">
          <AccountStep onSubmitStep={handleAccountSubmit} />
        </div>

        {/* Step 2 */}
        <div className="w-1/2 h-full flex-shrink-0">
          <BarbershopStep
            onSubmitStep={handleBarbershopSubmit}
            onBack={handleBack}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;