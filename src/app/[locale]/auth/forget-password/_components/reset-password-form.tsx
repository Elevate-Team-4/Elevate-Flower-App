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
import useResetPassword from "../_hooks/use-reset-password";
import { ResetPasswordFields, resetPasswordSchema } from "@/lib/schemes/reset-password.schema";
import { useTranslations } from "next-intl";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils/cn";

export default function ResetPasswordForm() {
  const email = "ahmedhassan99fg@gmail.com";

  // Hooks
  const { isPending, resetPassword } = useResetPassword();
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
          console.log("success", values);
          toast({
            description: t("your-password-has-been-successfully-reset"),
          });
          router.push("/auth/signup");
        },
        onError: () => {
          toast({
            description: t("something-went-wrong-while-resetting-your-password-please-try-again"),
            variant: "destructive",
          });
        },
      },
    );
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => {
              const hasError = form.formState.errors.newPassword;
              return (
                <FormItem>
                  <FormLabel>{t("password-reset-password")}</FormLabel>
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
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="newRePassword"
            render={({ field }) => {
              const hasError = form.formState.errors.newRePassword;

              return (
                <FormItem>
                  <FormLabel>{t("confirm-password-reset-password")}</FormLabel>
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
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button
            type="submit"
            className="mt-9 w-full"
            disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)}
          >
            {t("reset-password-button")}
          </Button>
        </form>
      </Form>
    </>
  );
}
