"use client";

import { useState } from "react";
import ForgetPassword from "./forget-password/forget-password";
import ResetPassword from "./reset-password/reset-password";
import OTP from "./OTP/otp";

export default function FrogetPasswordFlow() {
  // Hooks
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");

  return (
    <>
      {/* Step 0 => Forget password component  */}
      {step === 0 && <ForgetPassword setStep={setStep} setEmail={setEmail} />}

      {/* Step 1 => OTP component  */}
      {step === 1 && <OTP setStep={setStep} email={email} />}

      {/* Step 2 => Forget password component  */}
      {step === 2 && <ResetPassword email={email} />}
    </>
  );
}
