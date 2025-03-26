import { axiosInstance } from "@/lib/axios.ts";
import { Organization } from "@/types/index.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const GET_ACTIVE_ORGANIZATION_QUERY_KEY = "getActiveOrganization";

export const getActiveOrganization = async () => {
  const response = await axiosInstance.get<Organization>(
    "/organizations/active"
  );
  return response.data;
};

export function useActiveOrganization() {
  return useQuery({
    queryKey: [GET_ACTIVE_ORGANIZATION_QUERY_KEY],
    queryFn: () => getActiveOrganization(),
    placeholderData: keepPreviousData,
  });
}
