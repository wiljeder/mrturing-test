import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { useUserStore } from "@/stores/user.store.ts";
import { useUsers } from "@/services/users/getUsers.ts";
import { useOrganizations } from "@/services/organizations/getOrganizations.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Users, Building2 } from "lucide-react";

export const Route = createFileRoute("/_dashboardLayout/")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useUserStore((state) => state.user);
  const { data: usersData, isLoading: isLoadingUsers } = useUsers();
  const { data: organizationsData, isLoading: isLoadingOrganizations } =
    useOrganizations();

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Users Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Users
            </CardTitle>
            <CardDescription>Total users in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {isLoadingUsers
                ? "Loading..."
                : usersData?.pagination.totalItems || 0}
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/users">
              <Button>View All Users</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Organizations Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Organizations
            </CardTitle>
            <CardDescription>Total organizations in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {isLoadingOrganizations
                ? "Loading..."
                : organizationsData?.pagination.totalItems || 0}
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/organizations">
              <Button>View All Organizations</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Outlet />
    </div>
  );
}
