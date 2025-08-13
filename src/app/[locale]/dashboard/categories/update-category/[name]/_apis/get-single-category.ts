import { Category } from "@/lib/types/category";

export async function getSingleCategory(id: string) {
  const response = await fetch(`${process.env.API}/categories/${id}`);
  const payload: APIResponse<Category> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.message);
  }
  return payload;
}
