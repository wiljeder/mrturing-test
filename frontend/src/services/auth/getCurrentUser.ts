import { useQuery } from "@tanstack/react-query";
import { LoginResponse, User } from "../../types/index.ts";
import { axiosInstance } from "../../lib/axios.ts";

const getCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get<LoginResponse["user"]>(
    "/api/users/me"
  );
  return response.data;
};

export function useCurrentUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
  });
}
