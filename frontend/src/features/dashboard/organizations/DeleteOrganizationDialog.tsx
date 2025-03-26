import { Button } from "@/components/ui/button.tsx";
import { DialogFooter } from "@/components/ui/dialog.tsx";
import { Dialog } from "@/components/Dialog.tsx";
import { useDeleteOrganization } from "@/services/organizations/deleteOrganization.ts";

interface DeleteOrganizationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteOrganizationDialog({
  isOpen,
  onOpenChange,
}: DeleteOrganizationDialogProps) {
  const deleteOrganization = useDeleteOrganization();

  const onSubmit = async () => {
    console.log("delete organization");
    try {
      await deleteOrganization.mutateAsync();
      onOpenChange(false);
    } catch (error) {
      console.error("delete organization error", error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
      title="Delete Organization"
      description="Are you sure you want to delete this organization? This action cannot be undone."
    >
      <DialogFooter>
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={onSubmit}
            disabled={deleteOrganization.isPending}
          >
            {deleteOrganization.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}
