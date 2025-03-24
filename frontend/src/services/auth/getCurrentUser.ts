import { useQuery } from "@tanstack/react-query";
import { LoginResponse, User } from "../../types/index.ts";
import { axiosInstance } from "../../lib/axios.ts";
import { useUserStore } from "@/stores/user.store.ts";

const getCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get<LoginResponse["user"]>("/users/me");
  return response.data;
};

export function useCurrentUser() {
  const token = useUserStore.getState().token;

  return useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    enabled: !!token,
  });
}
