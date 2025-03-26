import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/index.ts";
import { Button } from "@/components/ui/button.tsx";
import { UserMinus } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { RemoveUsersFromOrganizationDialog } from "@/features/dashboard/organizations/organizationDetails/RemoveUsersFromOrganizationDialog.tsx";

export function getOrganizationUsersColumns(): ColumnDef<User>[] {
  const DropdownActions = ({ user }: { user: User }) => {
    const [showRemoveFromOrgDialog, setShowRemoveFromOrgDialog] =
      useState(false);

    return (
      <>
        <Button
          size="icon"
          variant="destructive"
          onClick={() => setShowRemoveFromOrgDialog(true)}
        >
          <UserMinus className="h-4 w-4" />
        </Button>
        <RemoveUsersFromOrganizationDialog
          userIds={[user.id]}
          isOpen={showRemoveFromOrgDialog}
          onOpenChange={setShowRemoveFromOrgDialog}
        />
      </>
    );
  };

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
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
