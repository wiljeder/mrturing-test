import { Button } from "@/components/ui/button.tsx";
import { DialogFooter } from "@/components/ui/dialog.tsx";
import { Dialog } from "@/components/Dialog.tsx";
import { useAddUserToOrganization } from "../../../services/organizations/addUserToOrganization.ts";

interface AddUserToOrganizationDialogProps {
  userId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddUserToOrganizationDialog({
  userId,
  isOpen,
  onOpenChange,
}: AddUserToOrganizationDialogProps) {
  const addUserToOrganization = useAddUserToOrganization();

  const onSubmit = async () => {
    try {
      await addUserToOrganization.mutateAsync(userId);
      onOpenChange(false);
    } catch (error) {
      console.error("add user to organization error", error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
      title="Add User to Organization"
      description="Are you sure you want to add this user to an organization?"
    >
      <DialogFooter>
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            onClick={onSubmit}
            disabled={addUserToOrganization.isPending}
          >
            {addUserToOrganization.isPending
              ? "Adding..."
              : "Add to Organization"}
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}
