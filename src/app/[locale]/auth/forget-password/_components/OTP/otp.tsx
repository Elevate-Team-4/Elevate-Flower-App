"use client";

import { Button } from "@/components/ui/button";

interface OTPProps {
  setStep: (arg: number) => void;
  email: string;
}

export default function OTP({ setStep, email }: OTPProps) {
  return (
    <>
      <Button onClick={() => setStep(2)} className="w-full">
        go to next step
      </Button>
    </>
  );
}
