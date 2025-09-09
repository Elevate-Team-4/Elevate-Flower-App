"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegistrationFields, useRegisterSchema } from "@/lib/schemes/auth.schema";
import { Link } from "@/i18n/navigation";
import useRegister from "../_hook/use-register";

export default function RegisterForm() {
  // translations
  const t = useTranslations();

  // Hooks
  const { register, isPending, error } = useRegister();
  const registerSchema = useRegisterSchema();

  // Form
  const form = useForm<RegistrationFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: undefined,
      password: "",
      rePassword: "",
    },
  });

  // Functions
  function onSubmit(values: RegistrationFields) {
    register(values);
  }

  return (
    //  inputs
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
        <div className="grid grid-cols-2 gap-3">
          {/* frist name */}
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("frist-name")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input placeholder={t("placeholder-frist-name")} {...field} />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* last name */}
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("last-name")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input placeholder={t("placeholder-last-name")} {...field} />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("email")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input placeholder="user@example.com" {...field} />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Phone */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("phone")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <PhoneInput placeholder="(123) 456-7890" {...field} />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Gender */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}

                  <FormLabel>{t("gender")}</FormLabel>

                  {/* Field */}
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("select-gender")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">{t("male")}</SelectItem>
                      <SelectItem value="female">{t("female")}</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Password */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("password")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Confirm Password */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("confirm-password")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 bg-red-100 text-red-800 p-3 rounded-md">
            <Info className="w-4 h-4" />
            <span>{error.message}</span>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          className="w-full"
          disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)}
        >
          {t("register")}
        </Button>

        {/*  */}
        <p className="font-primary font-medium text-sm text-center">
          {t("already-have-an-account")}
          <span className="text-maroon-500 font-bold">
            <Link href={"/auth/login"}>{t("login")}</Link>
          </span>
          {/* we use Link from next-intl when we marge github code */}
        </p>
      </form>
    </Form>
  );
}
