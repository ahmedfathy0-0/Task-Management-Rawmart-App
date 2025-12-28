import api from "./axios";
import { API_ENDPOINTS } from "../constants";
import type { AuthResponse } from "../types";

export const login = async (credentials: any): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    API_ENDPOINTS.LOGIN,
    credentials
  );
  return response.data;
};

export const register = async (userData: any): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    API_ENDPOINTS.REGISTER,
    userData
  );
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post(API_ENDPOINTS.LOGOUT);
};
