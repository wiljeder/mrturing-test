import { Button } from "@/components/ui/button.tsx";
import { DialogFooter } from "@/components/ui/dialog.tsx";
import { Dialog } from "@/components/Dialog.tsx";
import { useRemoveUsersFromOrganization } from "@/services/organizations/removeUserFromOrganization.ts";

interface RemoveUsersFromOrganizationDialogProps {
  userIds: number[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function RemoveUsersFromOrganizationDialog({
  userIds,
  isOpen,
  onOpenChange,
  onSuccess,
}: RemoveUsersFromOrganizationDialogProps) {
  const removeUsersFromOrganization = useRemoveUsersFromOrganization();

  const onSubmit = async () => {
    try {
      await removeUsersFromOrganization.mutateAsync(userIds);
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("remove users from organization error", error);
    }
  };

  const userCount = userIds.length;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
      title={`Remove ${userCount} User${
        userCount !== 1 ? "s" : ""
      } from Organization`}
      description={`Are you sure you want to remove ${
        userCount === 1 ? "this user" : "these users"
      } from the organization?`}
    >
      <DialogFooter>
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={onSubmit}
            disabled={
              removeUsersFromOrganization.isPending || userIds.length === 0
            }
          >
            {removeUsersFromOrganization.isPending
              ? "Removing..."
              : `Remove ${userCount} User${userCount !== 1 ? "s" : ""}`}
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}
