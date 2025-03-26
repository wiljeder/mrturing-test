import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios.ts";

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateUserParams) => {
      const { data } = await axiosInstance.post("/users", params);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
