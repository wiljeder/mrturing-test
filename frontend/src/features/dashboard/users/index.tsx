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
import { RefreshCw, Search } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  TUserSearchSchema,
  userSearchSchema,
} from "@/schemas/userSearch.schema.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";

export function Users() {
  const navigate = useNavigate();
  const search = useSearch({
    from: "/_dashboardLayout/users",
  });

  const form = useForm<TUserSearchSchema>({
    resolver: zodResolver(userSearchSchema),
  });

  const users = useUsers({
    page: search.page ? Number(search.page) : 1,
    limit: search.limit ? Number(search.limit) : 10,
    name: search.name,
    email: search.email,
  });

  const pagination = usePagination(
    "/_dashboardLayout/users",
    users.data?.pagination
  );

  console.log("pagination", pagination);

  const onSearchSubmit = useCallback(
    (data: TUserSearchSchema) => {
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

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage your users</p>
        </div>
        <Button
          variant="outline"
          onClick={() => users.refetch()}
          disabled={users.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${users.isFetching ? "animate-spin" : ""}`}
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
              data={users.data?.users ?? []}
              columns={getUserColumns({
                navigate,
              })}
              pagination={pagination}
              isLoading={users.isFetching}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
