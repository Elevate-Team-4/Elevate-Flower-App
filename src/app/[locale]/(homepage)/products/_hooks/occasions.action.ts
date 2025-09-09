"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { occasions } from "@/lib/types/occasions";

export const getOccasions = async (page: number = 1, limit: number = 6) => {
  try {
    const response = await fetch(`${process.env.API}/occasions?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        ...JSON_HEADER,
      },
    });

    const payload: APIResponse<PaginatedResponse<occasions>> = await response.json();

    if ("error" in payload) throw new Error(payload.error);

    return payload;
  } catch (error: unknown) {
    throw new Error(`An error occurred: ${error}`);
  }
};
