"use server";

import { ResetPassword } from "@/lib/types/rest-password";

export default async function resetPasswordAction(fileds: ResetPassword) {
  // Send PUT request to reset password endpoint
  const response = await fetch(`${process.env.API}/auth/resetPassword`, {
    method: "PUT",
    body: JSON.stringify(fileds),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Parse response as JSON
  const payload: APIResponse<ResetPassword> = await response.json();

  // Return the response payload
  return payload;
}
