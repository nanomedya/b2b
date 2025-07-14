import { apiClient } from "@/api/utils/apiClient";

 


export async function orderDetail(token:any, formData: any, id:any) {
  try {
    const response = await apiClient(
      `/orders?id=${id}`,
      "GET",
      token,
      null,
      formData
    );
    return response;
  } catch (error) {
    throw new Error("Sipariş verileri getirilirken bir hata oluştu");
  }
}
 

export async function orders(token:any, formData: any) {
  try {
    const response = await apiClient(
      "/orders",
      "GET",
      token,
      null,
      formData
    );
    return response;
  } catch (error) {
    throw new Error("Sipariş verileri getirilirken bir hata oluştu");
  }
}

export async function currencies(token:any) {
  try {
    const response = await apiClient("/currencies", "GET", token);
    return response;
  } catch (error) {
    throw new Error("Kur verileri getirilirken bir hata oluştu");
  }
}


export async function stories(token:any) {
  try {
    const response = await apiClient("/stories", "GET", token);
    return response;
  } catch (error) {
    throw new Error("Hikaye verileri getirilirken bir hata oluştu");
  }
}

export async function bankaccounts(token:any) {
  try {
    const response = await apiClient("/bankaccounts", "GET", token);
    return response;
  } catch (error) {
    throw new Error("Hikaye verileri getirilirken bir hata oluştu");
  }
}


export async function brands(token:any) {
  try {
    const response = await apiClient("/brands", "GET", token);
    return response;
  } catch (error) {
    throw new Error("Hikaye verileri getirilirken bir hata oluştu");
  }
}

export async function warehouses(token:any) {
  try {
    const response = await apiClient("/warehouses", "GET", token);
    return response;
  } catch (error) {
    throw new Error("Hikaye verileri getirilirken bir hata oluştu");
  }
}


export async function campaigns(token:any) {
  try {
    const response = await apiClient("/campaigns", "GET", token);
    return response;
  } catch (error) {
    throw new Error("Kampanya verileri getirilirken bir hata oluştu");
  }
}

export async function news(token:any) {
  try {
    const response = await apiClient("/news", "GET", token);
    return response;
  } catch (error) {
    throw new Error("Haber verileri getirilirken bir hata oluştu");
  }
}

 

export async function productSearch(token:any, formData: any) {
  try {
    const response = await apiClient(
      "/search",
      "GET",
      token,
      null,
      formData
    );
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}