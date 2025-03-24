import axios from "axios";
import { useUserStore } from "../stores/user.store.ts";

const baseURL = "http://localhost:3000";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      useUserStore.getState().logout();
      globalThis.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
