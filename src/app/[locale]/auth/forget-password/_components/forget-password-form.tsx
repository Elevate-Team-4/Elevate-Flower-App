"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { ForgetPasswordFields, forgetPasswordSchema } from "@/lib/schemes/forget-password.schema";
import { useRouter } from "next/navigation";
import useForgetPassword from "../_hooks/use-forget-password";

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
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { toast } from "@/hooks/use-toast";

export default function ForgetPasswordForm() {
  // Hooks
  const { isPending, forgetPassword } = useForgetPassword();
  const router = useRouter();

  // Translation
  const t = useTranslations();

  // Initializing react hook form
  const form = useForm<ForgetPasswordFields>({
    resolver: zodResolver(forgetPasswordSchema()),
    defaultValues: {
      email: "",
    },
  });

  //Functions
  const onSubmit: SubmitHandler<ForgetPasswordFields> = (values) => {
    forgetPassword(values, {
      onSuccess: () => {
        console.log("success", values);
        toast({
          title: t("otp-sent"),
          description: t("descreption-toast-forgetpassword"),
        });
      },
      onError: () => {
        toast({
          title: t("email-not-found-error-toast"),
          description: t("descreption-error-toast-forgetpassword"),
          variant: "destructive",
        });
      },
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              const hasError = form.formState.errors.email;

              return (
                <FormItem>
                  {/* Label */}
                  <FormLabel
                    className={cn(
                      hasError
                        ? "border-maroon-600 focus-visible:ring-red-600 dark:border-soft-pink-600 dark:focus-visible:ring-red-500"
                        : "",
                      "",
                    )}
                  >
                    {t("email")}
                  </FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      placeholder="user@example.com"
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

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button
            className="mt-9 w-full"
            disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)}
            type="submit"
          >
            {t("continue")}
          </Button>
        </form>
      </Form>
    </>
  );
}
