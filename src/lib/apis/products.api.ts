import { Products, SearchParamProduct } from "../types/products";

export const getProducts = async (params: SearchParamProduct | undefined) => {
  // Declareing products API
  const url = new URL(`${process.env.API}/Products`);

  // If no params are given (undefined)
  if (!params) {
    const response = await fetch(url.toString());

    const payload: APIResponse<PaginatedResponse<Products>> =
      await response.json();

    return payload;
  }

  // If params are gevin (this handle any given params included in the type)
  Object.entries(params).forEach((param) => {
    url.searchParams.append(param[0].toString(), param[1].toString());
  });

  // Extracting only the aPI link
  const response = await fetch(url.toString());

  // Reaturning the products results
  const payload: APIResponse<PaginatedResponse<Products>> =
    await response.json();

  return payload;
};

