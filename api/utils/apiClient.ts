export const apiClient = async (
  endpoint: string,
  method: string = "GET",
  token: string | null = null,
  body: any = null,
  params: Record<string, any> = {}
) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Query parameters için URL'i düzenle
  const query = new URLSearchParams(params).toString();
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API + endpoint}${
    query ? `?${query}` : ""
  }`;

  const options: RequestInit = {
    method,
    headers,
  };

  // Sadece POST, PUT gibi istekler için body ekle
  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    // response.ok kontrolü ile hata durumunu ele al
    if (response.ok) {
      return await response.json();
    } 
  } catch (error:any) {
    // Hata mesajını döndür ve sadece serileştirilebilen kısmı al
    return { 
      error: {
        message: error.message,
        stack: error.stack, // İsteğe bağlı, stack de döndürülebilir
      }
    };
  }
};
