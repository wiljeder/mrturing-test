import { useUserStore, resetUserStore } from "@/stores/user.store.ts";
import { useNavigate } from "@tanstack/react-router";
import { useCurrentUser } from "@/services/auth/getCurrentUser.ts";
// @ts-types="react"
import {
  // @ts-types="react"
  useCallback,
  useEffect,
  useRef,
} from "react";

export function useAuthenticated({
  redirectTo = "/login",
}: {
  redirectTo?: string;
} = {}) {
  const navigate = useNavigate();
  const { token, setAuth } = useUserStore();
  const user = useCurrentUser();
  const hasProcessed = useRef(false);

  const logout = useCallback(() => {
    hasProcessed.current = true;

    resetUserStore();
    navigate({ to: redirectTo });
  }, [redirectTo, navigate]);

  useEffect(() => {
    if (hasProcessed.current) return;

    if (!token) {
      logout();
      return;
    }

    if (user.isLoading) return;

    if (!user.data || user.isError) {
      logout();
      return;
    }

    if (!hasProcessed.current) {
      hasProcessed.current = true;
      setAuth(token, user.data);
    }
  }, [navigate, setAuth, token, user, redirectTo, logout]);
}
