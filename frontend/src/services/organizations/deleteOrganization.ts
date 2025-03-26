import { axiosInstance } from "@/lib/axios.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_ORGANIZATIONS_QUERY_KEY } from "@/services/organizations/getOrganizations.ts";

export const deleteOrganization = async () => {
  const response = await axiosInstance.delete(`/organizations`);
  return response.data;
};

export function useDeleteOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteOrganization"],
    mutationFn: deleteOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ORGANIZATIONS_QUERY_KEY],
      });
    },
  });
}
