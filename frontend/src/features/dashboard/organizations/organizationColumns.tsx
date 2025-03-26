import { ColumnDef } from "@tanstack/react-table";
import { Organization } from "@/types/index.ts";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Check, Eye, MoreHorizontal, Trash } from "lucide-react";
import { UseNavigateResult } from "@tanstack/react-router";
import { useState } from "react";
import { DeleteOrganizationDialog } from "./DeleteOrganizationDialog.tsx";

export function getOrganizationColumns({
  navigate,
  setActiveOrganization,
}: {
  navigate: UseNavigateResult<string>;
  setActiveOrganization: (id: number) => Promise<void>;
}): ColumnDef<Organization>[] {
  const DropdownActions = ({
    organization,
  }: {
    organization: Organization;
  }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
              onClick={async () => {
                await setActiveOrganization(organization.id);

                navigate({ to: `/organizations/${organization.id}` });
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setActiveOrganization(organization.id)}
            >
              <Check className="h-4 w-4 mr-2" />
              Set Active
            </DropdownMenuItem>
            {organization.isActive && (
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-destructive"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DeleteOrganizationDialog
          isOpen={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
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
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
    },
    {
      header: "Status",
      accessorKey: "isActive",
      cell: ({ row }) => {
        const organization = row.original as Organization;
        return (
          <Badge
            variant={organization.isActive ? "success" : "destructive"}
            className="text-xs"
          >
            {organization.isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const organization = row.original as Organization;
        return <DropdownActions organization={organization} />;
      },
    },
  ];
}
