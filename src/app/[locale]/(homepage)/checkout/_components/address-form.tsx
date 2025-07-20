"use client";

import { useState } from "react";
import { Address } from "@/lib/types/addresses";
import AddressStep1 from "./address-step1";
import AddressStep2 from "./address-step2";

export default function AddressForm() {
  // hook
  const [step, setStep] = useState<number>(1);
  const [address, setAddress] = useState<object>({});

  return (
    <>
      {step === 1 ? (
        <AddressStep1
          step={step}
          setStep={setStep}
          setAddress={setAddress}
          address={address as Address}
        />
      ) : step === 2 ? (
        <AddressStep2 step={step} setStep={setStep} address={address as Address} />
      ) : null}
    </>
  );
}
