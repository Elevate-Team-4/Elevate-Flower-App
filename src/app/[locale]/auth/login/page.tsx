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
      <h2 className=" ltr:font-edwardian rtl:font-diwany w-full text-center text-maroon-700 dark:text-soft-pink-300 text-5xl pb-5">
        {t("welcome_back")}
      </h2>

      {/** Login form */}
      <LoginForm />

      <p className="pt-5 text-sm font-medium">
        {t("no_account")}{" "}
        <Link className="text-maroon-700 dark:text-soft-pink-300 font-bold" href="/auth/signup">
          {t("create_account")}
        </Link>
      </p>
    </>
  );
}
