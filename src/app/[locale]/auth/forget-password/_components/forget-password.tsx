import { Link } from "@/i18n/navigation";
import ForgetPasswordForm from "./forget-password-form";
import { useTranslations } from "next-intl";

export default function ForgetPassword() {
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

      {/* Line */}
      <hr className="mt-4 mb-6" />

      {/* Forget password form */}
      <ForgetPasswordForm />

      {/* Line */}
      <hr className="mt-9 mb-5" />

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
