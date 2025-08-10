import React from "react";
import { useTranslations } from "next-intl";
import RegisterForm from "./_components/register-form";

export default function SignupPage() {
  const t = useTranslations();

  return (
    <div className="w-[406px] flex flex-col justify-center gap-6">
      {/* header */}
      <div className="flex justify-center border-b-2 border-zinc-200 pb-4">
        <h6 className="text-4xl font-normal text-maroon-700 font-pinyon">{t("headings-signup")}</h6>
      </div>

      {/* register form */}
      <RegisterForm />
    </div>
  );
}
