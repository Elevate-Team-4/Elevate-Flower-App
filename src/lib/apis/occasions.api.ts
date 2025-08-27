import { occasions, SearchParamOcassion } from "../types/occasions";

export const getOccasions = async (params: SearchParamOcassion | undefined) => {
  // Declareing occasion API
  const url = new URL(`${process.env.NEXT_PUBLIC_API}/occasions`);

  // If no params are given
  if (!params) {
    const response = await fetch(url.toString());

    const payload: APIResponse<PaginatedResponse<occasions>> = await response.json();

    return payload;
  }

  // If params are gevin (this handle any given params included in the param type)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key.toString(), value.toString());
    }
  });

  // Extracting only the aPI Link
  const response = await fetch(url.toString());

  // Reaturning the occasion results
  const payload: APIResponse<PaginatedResponse<occasions>> = await response.json();

  return payload;
};
