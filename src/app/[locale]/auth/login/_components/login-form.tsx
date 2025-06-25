"use client";

// React & Next.js
import { useTranslations } from "next-intl";

// Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@/i18n/navigation";

// UI Components
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Schemas & Types
import { LoginFields, useLoginSchema } from "@/lib/schemas/auth.schema";

// Hooks & Utils
import { cn } from "@/lib/utils/cn";
import { toast } from "@/hooks/use-toast";
import useLogin from "../_hooks/use-login";

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
          description: error?.message || "An error occurred during login",
          variant: "destructive",
        });
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full pt-6 pb-9 border-y border-zinc-200 dark:border-zinc-600"
      >
        {/* Email Input field */}
        <FormField
          control={form.control}
          name={"email"}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("placeholders.email")}
                  autoComplete="email"
                  className={cn(
                    fieldState.error ? "border-red-500 focus:border-none" : "border-borderGray",
                    "rounded-lg h-12 placeholder:text-neutralGray bg-lightGray shadow-secondary",
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Input field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t("password")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="new-password"
                  placeholder={t("placeholders.password")}
                  type="password"
                  className={cn(
                    fieldState.error ? "border-red-500 focus:border-none" : "border-borderGray",
                    "rounded-lg h-12 placeholder:text-neutralGray bg-lightGray shadow-secondary",
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form actions & links */}
        <div className="flex flex-col">
          <Link
            className="no-underline text-end -mt-2 text-maroon-700 dark:text-soft-pink-300 font-semibold"
            href="/auth/forget-password"
          >
            {t("forgot_password")}
          </Link>

          {error?.message && <p className="text-red-500 text-sm mt-2">{error?.message}</p>}
          <Button
            type="submit"
            className="w-full h-10 font-semibold mt-8 rounded-xl bg-maroon-600 text-white hover:bg-maroon-800"
            disabled={isPending}
          >
            {isPending ? t("logging_in") : t("login_button")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
