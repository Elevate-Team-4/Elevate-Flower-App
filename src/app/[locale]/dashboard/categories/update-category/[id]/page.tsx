import React from "react";
import { Category } from "@/lib/types/category";
import AddCaregoryForm from "../../add-category/_components/caregory-form";

export default async function Page({ params }: { params: { id: string } }) {
  const option = await fetch(`https://flower.elevateegy.com/api/v1/categories/${params.id}`);
  const payload: APIResponse<Category> = await option.json();
  if ("error" in payload) {
    throw new Error(payload.message);
  }
  if (payload === undefined) {
    return <div>Loading..............</div>;
  }
  console.log(payload);

  return (
    <section>
      <AddCaregoryForm category={payload.category} />
    </section>
  );
}
