import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboardLayout/users")({
  component: DashboardUsers,
});

import { Users } from "@/features/dashboard/users/index.tsx";

export default function DashboardUsers() {
  return <Users />;
}
