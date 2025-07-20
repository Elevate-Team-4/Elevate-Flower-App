// "use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { Addresses } from "@/lib/types/addresses";

export default async function getAddresses() {
  // Waiting for merge auth pages for login
  // const token = await getDecodedToken();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjc4YTc4M2QzYzM3OTc0OTI3NDdjOGU2Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzcxMjc5OTd9.ey-sIWm8Z9QpiUNEfK5U-Ma5lzB2NxI7-DbKZfH1wfM";

  const respones = await fetch(`${process.env.NEXT_PUBLIC_API}/addresses`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...JSON_HEADER,
    },
  });

  const payload: APIResponse<Addresses> = await respones.json();
  if ("code" in payload) {
    throw new Error("Error");
  }

  return payload as SuccessfulResponse<Addresses>;
}
