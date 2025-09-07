"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { ForgetPasswordFields, forgetPasswordSchema } from "@/lib/schemes/forget-password.schema";
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
import useForgetPassword from "../../_hooks/use-forget-password";

// Probs type
interface ForgetPasswordProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function ForgetPasswordForm({ setStep, setEmail }: ForgetPasswordProps) {
  // Hooks
  const { isPending, forgetPassword, error } = useForgetPassword();

  // Translation
  const t = useTranslations();

  // Initializing react hook form
  const schema = forgetPasswordSchema();
  const form = useForm<ForgetPasswordFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  //Functions
  const onSubmit: SubmitHandler<ForgetPasswordFields> = (values) => {
    forgetPassword(values, {
      onSuccess: () => {
        // Go to OTP (step 1 => OTP)
        setStep(1);

        // Set email
        setEmail(values.email);
      },
      // onError , onSuccess handled in hook (use-reset-password)
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 border-t-2 border-b-2 pt-6 pb-9 mb-5 mt-4"
        >
          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              const hasError = form.formState.errors.email;
              return (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("email")}</FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      placeholder="user@example.com"
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
          {/* Continue Button */}
          <Button
            className="mt-9 w-full"
            isLoading={isPending}
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
