"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { Occasions } from "@/lib/types/occasions";

export const getOccasions = async (page: number = 1, limit: number = 6) => {
  try {
    const response = await fetch(`${process.env.API}/occasions?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        ...JSON_HEADER,
      },
    });

    const payload: APIResponse<Occasions> = await response.json();

    if ("error" in payload) throw new Error(payload.error);

    return payload;
  } catch (error: unknown) {
    throw new Error(`An error occurred: ${error}`);
  }
};
