import { JSON_HEADER } from "@/lib/constants/api.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  // if (!token) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }
  const response = await fetch(`${process.env.API}/addresses`, {
    next: {
      tags: ["user-addresses"],
    },
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjg3NWMzMTFhOGJjYTMwN2Y5ZDA3ZDkwIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTI4MDA1Nzl9.rNDRfJ52evIWlMhsgvTYIzZP_rrQnl-BEbz1XPnljSE`,
    },
  });
  const payload = await response.json();
  return NextResponse.json(payload);
}
