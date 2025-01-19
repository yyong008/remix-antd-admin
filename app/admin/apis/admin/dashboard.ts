import api from "~/libs/axios";

export async function getDashboard() {
  try {
    return await api.get("/admin/dashboard/dashboard");
  } catch (error) {
    console.error(error);
    return error;
  }
}
