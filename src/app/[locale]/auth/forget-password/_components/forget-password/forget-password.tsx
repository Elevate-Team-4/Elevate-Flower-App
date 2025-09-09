import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ForgetPasswordForm from "./forget-password-form";

// Forget password props type
interface ForgetPasswordProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function ForgetPassword({ setStep, setEmail }: ForgetPasswordProps) {
  // Translation
  const t = useTranslations();

  return (
    <div>
      {/* Title & descreption */}
      <div>
        {/* Title */}
        <h2 className="font-semibold text-2xl mb-1">{t("forgot-password-title")}</h2>
        <p>{t("forgot-password-descreption")}</p>
      </div>

      {/* Forget password form */}
      <ForgetPasswordForm setStep={setStep} setEmail={setEmail} />

      {/* Link to sign up page */}
      <p className="font-bold text-center">
        {t("do-not-have-an-account")}{" "}
        <Link className="text-maroon-700 dark:text-soft-pink-300" href={"/auth/signup"}>
          {t("sign-up-link")}
        </Link>
      </p>
    </div>
  );
}
