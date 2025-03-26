import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useActiveOrganization } from "@/services/organizations/getActiveOrganization.ts";
import { OrganizationDetailsForm } from "./OrganizationDetailsForm.tsx";
import { OrganizationUsers } from "./OrganizationUsers.tsx";

export default function OrganizationDetails() {
  const { data: organization, isLoading } = useActiveOrganization();

  if (isLoading) {
    return <div className="p-6">Loading organization details...</div>;
  }

  if (!organization) {
    return <div className="p-6">No organization found</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Organization Details
        </h1>
        <p className="text-muted-foreground">
          Manage your organization information and users
        </p>
      </div>

      <OrganizationDetailsForm organization={organization} />
      <OrganizationUsers />
    </div>
  );
}
