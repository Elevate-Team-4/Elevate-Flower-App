"use client";

import { Button } from "@/components/ui/button";

interface OTPProps {
  setStep: (step: number) => void;
  email: string;
}

export default function OTP({ setStep, email }: OTPProps) {
  return (
    <>
      <div className="mb-4">
        <p className="text-sm text-gray-600">We&lsquo;ve sent a verification code to: {email}</p>
      </div>
      <Button onClick={() => setStep(2)} className="w-full">
        go to next step
      </Button>
    </>
  );
}
