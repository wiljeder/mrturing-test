import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios.ts";
import { toastError } from "@/utils/errors.ts";
import { toast } from "sonner";

export function useAddUserToOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      const { data } = await axiosInstance.post(`/organizations/${userId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });

      toast.success("User added to organization");
    },
    onError: (error) => {
      toastError(error);
    },
  });
}
