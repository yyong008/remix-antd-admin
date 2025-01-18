import api from "@/admin/apis";

export async function getDashboard() {
  try {
    return await api.get("/admin/dashboard");
  } catch (error) {
    console.error(error);
    return error;
  }
}
