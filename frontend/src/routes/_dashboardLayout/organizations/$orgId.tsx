import { createFileRoute } from "@tanstack/react-router";
import OrganizationDetails from "../../../features/dashboard/organizations/organizationDetails/index.tsx";

export const Route = createFileRoute("/_dashboardLayout/organizations/$orgId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OrganizationDetails />;
}
