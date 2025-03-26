import { axiosInstance } from "@/lib/axios.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_ORGANIZATIONS_QUERY_KEY } from "@/services/organizations/getOrganizations.ts";

export const setActiveOrganization = async (id: number) => {
  const response = await axiosInstance.post(`/organizations/${id}/activate`);
  return response.data;
};

export function useSetActiveOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["setActiveOrganization"],
    mutationFn: setActiveOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ORGANIZATIONS_QUERY_KEY],
      });
    },
  });
}
