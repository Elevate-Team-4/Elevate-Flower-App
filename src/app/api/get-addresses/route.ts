import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { JSON_HEADER } from "@/lib/constants/api.constant";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const response = await fetch(`${process.env.API}/addresses`, {
    next: {
      tags: ["user-addresses"],
    },
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
  });

  const payload = await response.json();

  return NextResponse.json(payload);
}
