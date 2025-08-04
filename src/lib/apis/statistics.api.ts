import {CategoryStatistics,Overall} from "../types/statistics";
import { getAuthHeader } from "../utils/auth-header";

export const getOverallStatistics = async () => {
  // Declaring overall API
  const url = new URL(`${process.env.API}/statistics/overall`);

  const response = await fetch(url.toString(), {
    headers: {
      ...(await getAuthHeader()),
    },
  });

  // Returning the results
  const payload: APIResponse<Overall> = await response.json();

  return payload;
};