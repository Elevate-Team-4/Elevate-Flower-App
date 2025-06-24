import { Link } from "@/i18n/navigation";
import ResetPasswordForm from "./reset-password-form";
import { useTranslations } from "next-intl";

export default function ResetPassword() {
  // Translation
  const t = useTranslations();

  return (
    <div>
      {/* Title & descreption */}
      <div>
        {/* Title */}
        <h2 className="font-semibold text-2xl mb-1">{t("title-reset-passwprd")}</h2>
        <p>{t("descreption-reset-password")}</p>
      </div>

      {/* Line */}
      <hr className="mt-4 mb-6" />

      {/* Reset password form */}
      <ResetPasswordForm />

      {/* Line */}
      <hr className="mt-9 mb-5" />

      {/* Link to sign up page */}
      <p className="font-bold text-center">
        {t("need-help")}{" "}
        <Link className="text-maroon-700 dark:text-soft-pink-300" href={"/contact-us"}>
          {t("contact-us-link-reset-password")}
        </Link>
      </p>
    </div>
  );
}
