"use client";

import { signIn } from "next-auth/react";

export default function Page() {
  signIn("credentials");

  return <>Sign in</>;
}
