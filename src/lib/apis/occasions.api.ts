import { occasions, SearchParamOcassion } from "../types/occasions";

export const getOccasions = async (params: SearchParamOcassion | undefined) => {
  // ? Declareing Occasion API
  const url = new URL(`${process.env.API}/occasions`);

  // ? If No Params Are Given
  if (!params) {
    const response = await fetch(url.toString());

    const payload: APIResponse<PaginatedResponse<occasions>> =
      await response.json();

    return payload;
  }

  // ? If Params Are Gevin (this handle any given params included in the param type)
  Object.entries(params).forEach((param) => {
    url.searchParams.append(param[0].toString(), param[1].toString());
  });

  // ? Extracting Only The API Link
  const response = await fetch(url.toString());

  // ? Reaturning The Occasion Results
  const payload: APIResponse<PaginatedResponse<occasions>> =
    await response.json();

  return payload;
};
