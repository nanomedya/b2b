import { apiClient } from "@/api/utils/apiClient";

export async function channels() {
  try {
    const response = await apiClient("/mob/channels", "GET");
    return response;
  } catch (error) {
    throw new Error("Kanallar getirilirken bir hata oluştu");
  }
}
