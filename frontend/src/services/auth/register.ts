import { useMutation } from "@tanstack/react-query";
import { RegisterRequest } from "../../types/index.ts";
import { axiosInstance } from "../../lib/axios.ts";

const register = async (data: RegisterRequest) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

export function useRegister() {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: register,
  });
}
