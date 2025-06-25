"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useResetPassword from "../../_hooks/use-reset-password";
import { ResetPasswordFields, resetPasswordSchema } from "@/lib/schemes/reset-password.schema";
import { useTranslations } from "next-intl";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils/cn";

interface ResetPasswordProps {
  email: string;
}

export default function ResetPasswordForm({ email }: ResetPasswordProps) {
  // Hooks
  const { isPending, resetPassword, error } = useResetPassword();
  const router = useRouter();

  // Translation
  const t = useTranslations();

  // Initializing react hook form
  const form = useForm<ResetPasswordFields>({
    resolver: zodResolver(resetPasswordSchema()),
    defaultValues: {
      newPassword: "",
      newRePassword: "",
    },
  });

  //Functions
  const onSubmit: SubmitHandler<ResetPasswordFields> = (values: ResetPasswordFields) => {
    resetPassword(
      {
        email,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          // On success toest
          toast({
            description: t("reset-success"),
          });

          // Redirect to log in page
          router.push("/auth/login");
        },
        onError: () => {
          // On error toast
          toast({
            description: t("reset-error"),
            variant: "destructive",
          });
        },
      },
    );
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 border-t-2 border-b-2 pt-6 pb-9 mb-5 mt-4"
        >
          {/* New password field */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => {
              const hasError = form.formState.errors.newPassword;
              return (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("password-reset-password")}</FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      className={cn(
                        hasError
                          ? "border-maroon-600 focus-visible:ring-red-600 dark:border-soft-pink-600 dark:focus-visible:ring-red-500"
                          : "",
                        "",
                      )}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>

                  {/* Error message */}
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* New re password field */}
          <FormField
            control={form.control}
            name="newRePassword"
            render={({ field }) => {
              const hasError = form.formState.errors.newRePassword;

              return (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("confirm-password-reset-password")}</FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      className={cn(
                        hasError &&
                          "border-maroon-600 focus-visible:ring-red-600 dark:border-soft-pink-600 dark:focus-visible:ring-red-500",
                      )}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>

                  {/* Error message */}
                  <FormMessage />
                  {error && (
                    <p className="font-medium text-destructive dark:text-red-500 text-sm mt-2">
                      {error.message}
                    </p>
                  )}
                </FormItem>
              );
            }}
          />

          {/* Reset password button */}
          <Button
            type="submit"
            className="mt-9 w-full"
            isLoading={isPending}
            disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)}
          >
            {t("reset-password-button")}
          </Button>
        </form>
      </Form>
    </>
  );
}
