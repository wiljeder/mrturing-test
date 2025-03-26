import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios.ts";
import { toastError } from "@/utils/errors.ts";
import { toast } from "sonner";
import { GET_ORGANIZATION_USERS_QUERY_KEY } from "@/services/organizations/getOrganizationUsers.ts";

export function useRemoveUsersFromOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userIds: number[]) => {
      const { data } = await axiosInstance.delete(`/organizations/users`, {
        data: {
          ids: userIds,
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ORGANIZATION_USERS_QUERY_KEY],
      });

      toast.success("User(s) removed from organization");
    },
    onError: (error) => {
      toastError(error);
    },
  });
}
