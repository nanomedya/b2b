// src/services/authServices.ts
import { apiClient } from "@/api/utils/apiClient"; // apiClient fonksiyonunuzu kullanın

export async function register(formData: any) {
  try {
    const response = await apiClient(
      "/auth/register/register-phone",
      "POST",
      null,
      formData
    );
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function login(formData: any) {
  try {
    const response = await apiClient(
      "/auth",
      "POST",
      null,
      formData
    );
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function update(token:any, formData: any) {
  try {
    const response = await apiClient(
      "/profile/update",
      "POST",
      token,
      formData
    );
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function logout(token:any) {
  try {
    const response = await apiClient(
      "/logout",
      "GET",
      token
    );
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

 