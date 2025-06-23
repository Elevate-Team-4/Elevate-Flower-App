/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// React & Next.js
import Link from "next/link";
import { useTranslations } from "next-intl";

// Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// UI Components
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// Schemas & Types
import { LoginFields, useLoginSchema } from "@/lib/schemas/auth.schema";

// Hooks
import { toast } from "@/hooks/use-toast";
import useLogin from "../_hooks/use-login";

// Local Components
import TextField from "../../_components/text-field";
import PasswordField from "../../_components/password-field";

// Error message mapping function
const getTranslatedErrorMessage = (errorMessage: string, t: any) => {
  // Convert to lowercase for case-insensitive matching
  const lowerCaseError = errorMessage.toLowerCase();

  // Check if it's the specific error we want to translate
  if (lowerCaseError.includes("incorrect email or password")) {
    return t("errors.incorrect_credentials");
  }

  // Return original message for all other errors
  return errorMessage;
};

export default function LoginForm() {
  // Hooks
  const t = useTranslations("auth");
  const LoginSchema = useLoginSchema();
  const { login, error, isPending } = useLogin();

  // Form setup with validation
  const form = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handles form submission for user login
  async function onSubmit(values: LoginFields) {
    login(values, {
      onSuccess: (data) => {
        // Show success notification
        toast({
          title: t("success.login_successful") || "Login Successful",
          description: t("welcome_back") || "Welcome back! You have been logged in successfully.",
        });

        // Redirect to the callback URL after a successful login
        window.location.href = data?.url || "/";
      },
      onError: () => {
        // Show error notification with translated message
        toast({
          title: t("errors.login_failed") || "Login Failed",
          description: translatedError || "An error occurred during login",
          variant: "destructive",
        });
      },
    });
  }

  // Get translated error message if error exists
  const translatedError = error?.message ? getTranslatedErrorMessage(error.message, t) : null;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full pt-6 pb-9 border-y border-zinc-200 dark:border-zinc-600"
      >
        {/* Email Input field */}
        <TextField
          control={form.control}
          name="email"
          autoComplete="email"
          placeholder={t("placeholders.email")}
          label={t("email")}
        />

        {/* Password Input field */}
        <PasswordField
          control={form.control}
          name="password"
          autoComplete="new-password"
          placeholder={t("placeholders.password")}
          label={t("password")}
        />

        {/* Form actions & links */}
        <div className="flex flex-col">
          <Link
            className="no-underline text-end -mt-2 text-maroon-700 dark:text-pink-300 font-semibold"
            href="/auth/forget-password"
          >
            {t("forgot_password")}
          </Link>

          {translatedError && <p className="text-red-500 text-sm mt-2">{translatedError}</p>}
          <Button
            type="submit"
            className="w-full h-10 mt-8 rounded-xl bg-maroon-600 text-white hover:bg-maroon-800"
            disabled={isPending}
          >
            {isPending ? t("logging_in") : t("login_button")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
