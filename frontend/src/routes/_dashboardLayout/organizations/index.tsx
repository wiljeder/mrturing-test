import { createFileRoute } from "@tanstack/react-router";
import { Organizations } from "@/features/dashboard/organizations/index.tsx";

export const Route = createFileRoute("/_dashboardLayout/organizations/")({
  component: OrganizationsIndex,
});

function OrganizationsIndex() {
  return <Organizations />;
}
