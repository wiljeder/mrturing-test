import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboardLayout/organizations")({
  component: DashboardOrganizations,
});

export default function DashboardOrganizations() {
  return <Outlet />;
}
