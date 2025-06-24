"use server";

import { ResetPassword } from "@/lib/types/rest-password";

export default async function resetPasswordAction(fileds: ResetPassword) {
  const response = await fetch(`${process.env.API}/auth/resetPassword`, {
    method: "PUT",
    body: JSON.stringify(fileds),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: APIResponse<ResetPassword> = await response.json();

  return payload;
}
