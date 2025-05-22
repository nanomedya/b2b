import { apiClient } from "@/api/utils/apiClient";
import { Category } from "@/types";

// Kategoriler için tip tanımı
 
export async function categories(channel: number): Promise<Category[]> {
  try {
    const response = await apiClient(`/mob/categories?channel=${channel}`, "GET");

    // API'den gelen yanıtın tipini doğruluyoruz
    if (!Array.isArray(response)) {
      throw new Error("Beklenmeyen veri formatı alındı.");
    }

    return response;
  } catch (error) {
    console.error("Kategoriler getirilirken bir hata oluştu:", error);
    throw new Error("Kategoriler alınırken bir hata oluştu. Lütfen tekrar deneyin.");
  }
}
