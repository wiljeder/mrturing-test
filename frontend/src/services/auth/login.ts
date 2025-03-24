import { axiosInstance } from "../../lib/axios.ts";
import { LoginRequest, LoginResponse } from "../../types/index.ts";
import { useMutation } from "@tanstack/react-query";

const login = async (data: LoginRequest) => {
  const response = await axiosInstance.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export function useLogin() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
}
