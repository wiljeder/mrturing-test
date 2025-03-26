import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/index.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Eye, MoreHorizontal, UserPlus } from "lucide-react";
import { UseNavigateResult } from "@tanstack/react-router";
import { useState } from "react";
import { AddUserToOrganizationDialog } from "./AddUserToOrganizationDialog.tsx";

export function getUserColumns({
  navigate,
}: {
  navigate: UseNavigateResult<string>;
}): ColumnDef<User>[] {
  const DropdownActions = ({ user }: { user: User }) => {
    const [showAddToOrgDialog, setShowAddToOrgDialog] = useState(false);

    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigate({ to: `/users/${user.id}` })}
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowAddToOrgDialog(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add to Organization
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AddUserToOrganizationDialog
          userId={user.id}
          isOpen={showAddToOrgDialog}
          onOpenChange={setShowAddToOrgDialog}
        />
      </>
    );
  };

  return [
    {
      header: "Id",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original as User;
        return <DropdownActions user={user} />;
      },
    },
  ];
}
