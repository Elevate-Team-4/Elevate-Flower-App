"use client";

import { useState } from "react";
import ForgetPassword from "./_components/forget-password/forget-password";
import ResetPassword from "./_components/reset-password/reset-password";
import OTP from "./_components/OTP/otp";

export default function Page() {
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
