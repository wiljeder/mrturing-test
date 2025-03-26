import { useUserStore } from "@/stores/user.store.ts";
import { useNavigate } from "@tanstack/react-router";
import { useCurrentUser } from "@/services/auth/getCurrentUser.ts";
import { useEffect } from "react";

export function useAnonymous({
  redirectTo = "/",
}: { redirectTo?: string } = {}) {
  const navigate = useNavigate();
  const { token } = useUserStore();
  const user = useCurrentUser();

  useEffect(() => {
    if (token && user.data && !user.isLoading && !user.isError) {
      navigate({ to: redirectTo });
    }
  }, [navigate, token, user, redirectTo]);
}
