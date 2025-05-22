// src/api/services/basketService.ts

import { apiClient } from "@/api/utils/apiClient";

export const getBasket = async (token:string, basketId: number): Promise<any> => {
  const response = await apiClient(`/basket/list`, "GET", token, null, {basketId: basketId});
  return response;
};

 
export const basketList = async (token:string): Promise<any> => {
  const response = await apiClient(`/basket/all`, "GET", token);
  return response;
};

export const createBasket = async (token: string, params: any): Promise<any> => {
  try {
    const response = await apiClient(`/basket/create`, "POST", token, params);
    return response; // Beklenen yanıt
  } catch (error: any) {
    console.error("API Error in createBasket:", error);
    return { success: false, message: error.message || "Bir hata oluştu." };
  }
};

 

export const setCurrentBasket = async (
  token: string,
  basketId: number,
) => {
  const params = {
    basket_id: basketId,
  };
  return await apiClient(`/basket/set`, "POST", token, params);
};
 

export const setBasketNames = async (
  token: string,
  data: any,
) => {
  const params = {
    baskets: data
  };
  return await apiClient(`/basket/names`, "POST", token, params);
};
 

export const addToBasket = async (
  token: string,
  productId: number,
  count: number,
  currentBasketId: number
) => {
  const params = {
    product_id: productId,
    count,
    currentBasketId,
  };
  return await apiClient(`/basket/add`, "POST", token, params);
};

export const removeFromBasket = async (
  token: string,
  productId: number,
  currentBasketId: number
) => {
  const params = { product_id:productId, basket_id: currentBasketId };
  await apiClient(`/basket/remove`, "POST", token, params);
};

export const emptyBasket = async (token:string, basketId:number) => {
  const params = { basket_id: basketId };
  await apiClient(`/basket/empty`, "POST", token, params);
};

export const deleteBasket = async (token:string, basketId:number) => {
  const params = { basket_id: basketId };
  await apiClient(`/basket/destroy`, "POST", token, params);
};
