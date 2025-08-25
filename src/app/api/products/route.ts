/* eslint-disable no-console */
import { NextResponse } from "next/server";
import { getProducts } from "@/lib/api/products.api";
import { SearchParamProduct } from "@/lib/types/products";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const params = searchParams.size
      ? (Object.fromEntries(searchParams.entries()) as unknown as SearchParamProduct)
      : undefined;

    const data = await getProducts(params);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
