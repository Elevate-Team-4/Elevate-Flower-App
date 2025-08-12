import "server-only";

import { decode, JWT } from "next-auth/jwt";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "../constants/api.constant";

export async function getTokenHeader() {
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
  return {
    token: JWT?.token || "",
  };
}
