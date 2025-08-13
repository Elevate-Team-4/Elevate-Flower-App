import React from "react";
import { Category } from "@/lib/types/category";
import CategoryForm from "../../_components/caregory-form";

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch(`${process.env.API}/categories/${params.id}`);
  const payload: APIResponse<Category> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.message);
  }

  if (payload === undefined) {
    return <div>Loading..............</div>;
  }

  return (
    <section>
      <CategoryForm category={payload.category} />
    </section>
  );
}
