import { Products, SearchParamProduct } from "../types/products";

export const getProducts = async (params: SearchParamProduct | undefined) => {
  // Declareing Products API
  const url = new URL(`${process.env.API}/Products`);

  // If No Params Are Given (Undefined)
  if (!params) {
    const response = await fetch(url.toString());

    const payload: APIResponse<PaginatedResponse<Products>> =
      await response.json();

    return payload;
  }

  // If Params Are Gevin (this handle any given params included in the type)
  Object.entries(params).forEach((param) => {
    url.searchParams.append(param[0].toString(), param[1].toString());
  });

  // Extracting Only The API Link
  const response = await fetch(url.toString());

  // Reaturning The Products Results
  const payload: APIResponse<PaginatedResponse<Products>> =
    await response.json();

  return payload;
};

