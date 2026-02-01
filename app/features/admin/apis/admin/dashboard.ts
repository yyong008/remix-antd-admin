import { getApiClient } from "~/api-client";

export async function getDashboard() {
  try {
    const res = await getApiClient().api.admin.dashboard.$get();
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}
