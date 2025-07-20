import { cookies } from "next/headers";
import { decode, JWT } from "next-auth/jwt";

export async function getDecodedToken() {
  const tokenCookie = cookies().get("next-auth.session-token")?.value;
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
