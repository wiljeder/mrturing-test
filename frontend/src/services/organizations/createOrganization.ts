import { axiosInstance } from "@/lib/axios.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateOrganizationRequest } from "@/types/index.ts";
import { GET_ORGANIZATIONS_QUERY_KEY } from "@/services/organizations/getOrganizations.ts";

export const createOrganization = async (data: CreateOrganizationRequest) => {
  const response = await axiosInstance.post(`/organizations`, data);
  return response.data;
};

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createOrganization"],
    mutationFn: createOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ORGANIZATIONS_QUERY_KEY],
      });
    },
  });
}
