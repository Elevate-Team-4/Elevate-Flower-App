import { Product, Products, SearchParamProduct } from "../types/products";

export const getProducts = async (params: SearchParamProduct | undefined) => {
  // Declareing products API
  const url = new URL(`${process.env.API}/Products`);

  // If no params are given (undefined)
  if (!params) {
    const response = await fetch(url.toString());

    const payload: APIResponse<PaginatedResponse<Products>> = await response.json();

    return payload;
  }

  // If params are gevin (this handle any given params included in the type)
  Object.entries(params).forEach((param) => {
    url.searchParams.append(param[0].toString(), param[1].toString());
  });

  // Extracting only the aPI link
  const response = await fetch(url.toString());

  // Reaturning the products results
  const payload: APIResponse<PaginatedResponse<Products>> = await response.json();

  return payload;
};

export const getProductById = async (productId: string) => {
  // Declaring single product API endpoint
  const url = `${process.env.API}/products/${productId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const payload: APIResponse<{ product: Product }> = await response.json();

    // Type guard to ensure it's a successful response
    if ("error" in payload) {
      throw new Error(payload.error);
    }

    return payload;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
