import { useMutation } from "@tanstack/react-query";
import { CreateUserRequest } from "../../types/index.ts";
import { axiosInstance } from "../../lib/axios.ts";

const register = async (data: CreateUserRequest) => {
  const response = await axiosInstance.post("/users", data);
  return response.data;
};

export function useRegister() {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: register,
  });
}
