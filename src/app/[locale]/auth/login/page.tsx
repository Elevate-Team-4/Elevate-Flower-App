// React & Next.js
import { useTranslations } from "next-intl";
import Link from "next/link";

// Local Components
import LoginForm from "./_components/login-form";

export default function Page() {
  // Hooks
  const t = useTranslations("auth");

  return (
    <>
      <h2 className="font-edwardian w-full text-center text-maroon-700 dark:text-pink-300 text-5xl pb-5">
        {t("welcome_back")}
      </h2>

      {/** Login form */}
      <LoginForm />

      <Link className="pt-5 text-sm font-medium" href="/signup">
        {t("no_account")}{" "}
        <span className="text-maroon-700 dark:text-pink-300 font-bold">{t("create_account")}</span>
      </Link>
    </>
  );
}
