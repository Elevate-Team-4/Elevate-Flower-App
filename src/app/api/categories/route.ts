import { AllCategory } from "@/lib/types/category";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  // Declareing Get all categories API
  const url = new URL(`${process.env.API}/categories`);

  // This handle any given search params
  searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  // Extracting only the API link
  const response = await fetch(url.toString());

  // Reaturning the Category results
  const payload: APIResponse<PaginatedResponse<AllCategory>> = await response.json();

  return NextResponse.json(payload, { status: response.status });
}
