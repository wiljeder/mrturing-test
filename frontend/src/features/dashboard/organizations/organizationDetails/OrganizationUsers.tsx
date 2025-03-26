import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { RefreshCw, Search } from "lucide-react";
import { useOrganizationUsers } from "@/services/organizations/getOrganizationUsers.ts";
import { DataTable } from "@/components/DataTable.tsx";
import { getOrganizationUsersColumns } from "@/features/dashboard/organizations/organizationDetails/organizationUsersColumns.tsx";
import { useSearch } from "@tanstack/react-router";
import { usePagination } from "@/hooks/usePagination.ts";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { RowSelectionState } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form.tsx";
import { RemoveUsersFromOrganizationDialog } from "./RemoveUsersFromOrganizationDialog.tsx";

const searchSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
});

type TSearchSchema = z.infer<typeof searchSchema>;

export function OrganizationUsers() {
  const navigate = useNavigate();
  const search = useSearch({
    from: "/_dashboardLayout/organizations/$orgId",
  });

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const form = useForm<TSearchSchema>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      name: search.name || "",
      email: search.email || "",
    },
  });

  const organizationUsers = useOrganizationUsers({
    page: search.page ? Number(search.page) : 1,
    limit: search.limit ? Number(search.limit) : 10,
    name: search.name,
    email: search.email,
  });

  const pagination = usePagination(
    "/_dashboardLayout/organizations/$orgId",
    organizationUsers?.data?.pagination
  );

  const onSearchSubmit = useCallback(
    (data: TSearchSchema) => {
      navigate({
        search: {
          ...search,
          ...data,
          page: 1,
        },
      });
    },
    [navigate, search]
  );

  const selectedUserIds = useCallback(() => {
    return Object.keys(rowSelection)
      .map((index) => organizationUsers?.data?.users[parseInt(index)]?.id)
      .filter(Boolean) as number[];
  }, [rowSelection, organizationUsers?.data?.users]);

  const hasSelectedUsers = Object.keys(rowSelection).length > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Organization Users</CardTitle>
          <div className="flex gap-2">
            {hasSelectedUsers && (
              <Button
                variant="destructive"
                onClick={() => setIsRemoveDialogOpen(true)}
              >
                Remove Selected Users
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => organizationUsers.refetch()}
              disabled={organizationUsers.isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${
                  organizationUsers.isLoading ? "animate-spin" : ""
                }`}
              />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSearchSubmit)}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              placeholder="Search by name..."
                              className="pl-8"
                              {...field}
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              placeholder="Search by email..."
                              className="pl-8"
                              {...field}
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="shrink-0">
                  Search
                </Button>
              </div>
            </form>
          </Form>

          <DataTable
            data={organizationUsers?.data?.users ?? []}
            columns={getOrganizationUsersColumns()}
            pagination={pagination}
            isLoading={organizationUsers.isLoading}
            selection={{
              rowSelection,
              onRowSelectionChange: setRowSelection,
            }}
          />
        </div>
      </CardContent>

      <RemoveUsersFromOrganizationDialog
        userIds={selectedUserIds()}
        isOpen={isRemoveDialogOpen}
        onOpenChange={setIsRemoveDialogOpen}
        onSuccess={() => setRowSelection({})}
      />
    </Card>
  );
}
