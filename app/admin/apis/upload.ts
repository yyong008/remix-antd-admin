import api from "~/libs/axios";

export async function uploadFeedback(data: any) {
  try {
    return await api.post("/admin/upload/feedback", data, {
       headers: {
            "Content-Type": "multipart/form-data",
        } 
    });
  } catch (error) {
    console.error(error);
    return error;
  }
}
