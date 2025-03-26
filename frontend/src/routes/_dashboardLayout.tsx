import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboardLayout")({
  component: RouteComponent,
});

import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/Sidebar.tsx";
import { useEffect } from "react";
import { useUserStore } from "@/stores/user.store.ts";
import { useNavigate } from "@tanstack/react-router";

function RouteComponent() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({
        to: "/login",
      });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-64 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
