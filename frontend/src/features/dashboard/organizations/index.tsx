import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useOrganizations } from "@/services/organizations/getOrganizations.ts";
import { DataTable } from "@/components/DataTable.tsx";
import { usePagination } from "@/hooks/usePagination.ts";
import { RowSelectionState } from "@tanstack/react-table";
import { useSearch } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useSetActiveOrganization } from "@/services/organizations/setActiveOrganization.ts";
import { useState } from "react";
import { CreateOrganizationDialog } from "./CreateOrganizationDialog.tsx";
import { getOrganizationColumns } from "./organizationColumns.tsx";
import { Button } from "@/components/ui/button.tsx";
import { RefreshCw } from "lucide-react";
import { useDeleteOrganization } from "@/services/organizations/deleteOrganization.ts";
import { toast } from "sonner";

export function Organizations() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const navigate = useNavigate();
  const search = useSearch({
    from: "/_dashboardLayout/organizations",
  });

  const setActiveOrganization = useSetActiveOrganization();
  const deleteOrganization = useDeleteOrganization();

  const {
    data: organizationsData,
    isFetching: organizationLoading,
    refetch,
  } = useOrganizations({
    page: search.page ? Number(search.page) : 1,
    limit: search.limit ? Number(search.limit) : 10,
  });

  const pagination = usePagination(
    "/_dashboardLayout/organizations",
    organizationsData?.pagination
  );

  const handleDeleteOrganization = () => {
    deleteOrganization.mutate(undefined, {
      onSuccess: () => {
        toast.success("Organization deleted successfully");
        refetch();
      },
      onError: (error) => {
        toast.error(`Failed to delete organization: ${error.message}`);
      },
    });
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
          <p className="text-muted-foreground">Manage your organizations</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={organizationLoading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${
                organizationLoading ? "animate-spin" : ""
              }`}
            />
            Refresh
          </Button>
          <CreateOrganizationDialog
            isOpen={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Organizations</CardTitle>
          <CardDescription>Recently created organizations</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={organizationsData?.organizations ?? []}
            columns={getOrganizationColumns({
              navigate,
              setActiveOrganization: async (id) =>
                await setActiveOrganization.mutate(id),
              deleteOrganization: handleDeleteOrganization,
            })}
            pagination={pagination}
            isLoading={organizationLoading}
            selection={{
              rowSelection,
              onRowSelectionChange: setRowSelection,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
