import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios.ts";
import { PaginatedUsers } from "@/types/index.ts";

interface GetUsersParams {
  page?: number;
  limit?: number;
  name?: string;
  email?: string;
}

export const getUsers = async (params: GetUsersParams = {}) => {
  const response = await axiosInstance.get<PaginatedUsers>("/users", {
    params,
  });
  return response.data;
};

export function useUsers(params: GetUsersParams = {}) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
    placeholderData: keepPreviousData,
  });
}
