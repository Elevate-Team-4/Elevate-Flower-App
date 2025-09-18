import { NextRequest, NextResponse } from "next/server";
import { JSON_HEADER } from "@/lib/constants/api.constant";

export async function GET(req: NextRequest, { params }: { params: { productId: string } }) {
  const { searchParams } = new URL(req.url);

  const pageParam = searchParams.get("page") || 1;

  const respone = await fetch(
    `${process.env.API}/products/${params.productId}/reviews?page=${pageParam}`,
    {
      headers: { ...JSON_HEADER },
    },
  );

  const payload = await respone.json();

  return NextResponse.json(payload);
}
