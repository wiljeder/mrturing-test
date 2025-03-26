import { axiosInstance } from "@/lib/axios.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateOrganizationRequest } from "@/types/index.ts";
import { GET_ORGANIZATIONS_QUERY_KEY } from "@/services/organizations/getOrganizations.ts";
import { GET_ACTIVE_ORGANIZATION_QUERY_KEY } from "@/services/organizations/getActiveOrganization.ts";

export const updateOrganization = async (data: UpdateOrganizationRequest) => {
  const response = await axiosInstance.put(`/organizations`, data);
  return response.data;
};

export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateOrganization"],
    mutationFn: updateOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ORGANIZATIONS_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [GET_ACTIVE_ORGANIZATION_QUERY_KEY],
      });
    },
  });
}
