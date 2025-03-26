import { axiosInstance } from "@/lib/axios.ts";
import { PaginatedOrganizations } from "@/types/index.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const GET_ORGANIZATIONS_QUERY_KEY = "getOrganizations";

interface GetOrganizationsParams {
  page?: number;
  limit?: number;
}

export const getOrganizations = async (params: GetOrganizationsParams = {}) => {
  const response = await axiosInstance.get<PaginatedOrganizations>(
    "/organizations",
    { params }
  );
  return response.data;
};

export function useOrganizations(params: GetOrganizationsParams = {}) {
  return useQuery({
    queryKey: [GET_ORGANIZATIONS_QUERY_KEY, params],
    queryFn: () => getOrganizations(params),
    placeholderData: keepPreviousData,
  });
}
