import "server-only";

import { cookies } from "next/headers";
import { AUTH_COOKIE } from "../constants/api.constant";
import { decode, JWT } from "next-auth/jwt";

// Returns ready header
export async function getAuthHeader() {
  const tokenCookie = cookies().get(AUTH_COOKIE)?.value;
  let JWT: JWT | null = null;
  try {
    JWT = await decode({
      token: tokenCookie,
      secret: process.env.NEXTAUTH_SECRET!,
    });
  } catch (error) {
    void error;
  }

  console.log(JWT?.token);

  return {
    Authorization: `Bearer ${JWT?.token}`,
  };
}
