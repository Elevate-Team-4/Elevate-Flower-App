import React from "react";
import CategoryForm from "../../_components/caregory-form";
import { getSingleCategory } from "./_apis/get-single-category";

export default async function Page({ params }: { params: { id: string } }) {
  const payload = await getSingleCategory(params.id);

  if (payload === undefined) {
    return <div>Loading..............</div>;
  }

  return (
    <section>
      <CategoryForm category={payload.category} />
    </section>
  );
}
