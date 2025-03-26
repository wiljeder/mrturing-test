import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useUsers } from "@/services/users/getUsers.ts";
import { DataTable } from "@/components/DataTable.tsx";
import { usePagination } from "@/hooks/usePagination.ts";
import { useSearch } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { getUserColumns } from "./userColumns.tsx";
import { Button } from "@/components/ui/button.tsx";
import { RefreshCw } from "lucide-react";

export function Users() {
  const navigate = useNavigate();
  const search = useSearch({
    from: "/_dashboardLayout/users",
  });

  const {
    data: usersData,
    isFetching: usersLoading,
    refetch,
  } = useUsers({
    page: search.page ? Number(search.page) : 1,
    limit: search.limit ? Number(search.limit) : 10,
  });

  const pagination = usePagination(
    "/_dashboardLayout/users",
    usersData?.pagination
  );

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage your users</p>
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={usersLoading}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${usersLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Recently created users</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={usersData?.users ?? []}
            columns={getUserColumns({
              navigate,
            })}
            pagination={pagination}
            isLoading={usersLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
