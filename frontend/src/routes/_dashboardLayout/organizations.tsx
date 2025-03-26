import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboardLayout/organizations")({
  component: DashboardOrganizations,
});

import { Organizations } from "@/features/dashboard/organizations/index.tsx";

export default function DashboardOrganizations() {
  return <Organizations />;
}
