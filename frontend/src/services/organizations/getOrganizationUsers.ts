import { axiosInstance } from "@/lib/axios.ts";
import { PaginatedUsers } from "@/types/index.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const GET_ORGANIZATION_USERS_QUERY_KEY = "getOrganizationUsers";

interface GetOrganizationUsersParams {
  page?: number;
  limit?: number;
  name?: string;
  email?: string;
}

export const getOrganizationUsers = async (
  params: GetOrganizationUsersParams = {}
) => {
  const response = await axiosInstance.get<PaginatedUsers>(
    "/organizations/users",
    { params }
  );
  return response.data;
};

export function useOrganizationUsers(params: GetOrganizationUsersParams = {}) {
  return useQuery({
    queryKey: [GET_ORGANIZATION_USERS_QUERY_KEY, params],
    queryFn: () => getOrganizationUsers(params),
    placeholderData: keepPreviousData,
  });
}
