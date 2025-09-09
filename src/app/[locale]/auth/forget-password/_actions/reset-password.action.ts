"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { ResetPassword } from "@/lib/types/rest-password";

export default async function resetPasswordAction(fileds: ResetPassword) {
  // Send PUT request to reset password endpoint
  const response = await fetch(`${process.env.API}/auth/resetPassword`, {
    method: "PUT",
    body: JSON.stringify(fileds),
    headers: {
      ...JSON_HEADER,
    },
  });

  // Parse response as JSON
  const payload: APIResponse<ResetPassword> = await response.json();

  // Return the response payload
  return payload;
}
