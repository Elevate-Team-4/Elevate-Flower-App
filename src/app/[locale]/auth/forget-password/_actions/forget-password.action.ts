"use server";

import { ForgetPasswordFields } from "@/lib/schemes/forget-password.schema";
import { ForgetPassword } from "@/lib/types/forget-password";

export default async function forgetPasswordAction(fileds: ForgetPasswordFields) {
  const response = await fetch(`${process.env.API}/auth/forgotPassword`, {
    method: "POST",
    body: JSON.stringify(fileds),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: APIResponse<ForgetPassword> = await response.json();

  return payload;
}
