import { Button } from "@/components/ui/button.tsx";
import { DialogFooter } from "@/components/ui/dialog.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Dialog } from "@/components/Dialog.tsx";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateOrganization } from "@/services/organizations/createOrganization.ts";

const createOrganizationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().optional(),
});

type TCreateOrganizationSchema = z.infer<typeof createOrganizationSchema>;

interface CreateOrganizationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateOrganizationDialog({
  isOpen,
  onOpenChange,
}: CreateOrganizationDialogProps) {
  const createOrganization = useCreateOrganization();

  const form = useForm<TCreateOrganizationSchema>({
    resolver: zodResolver(createOrganizationSchema),
  });

  const onSubmit = async (data: TCreateOrganizationSchema) => {
    try {
      await createOrganization.mutateAsync(data);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("create organization error", error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
      title="Create Organization"
      description="Create a new organization to manage users and resources."
      trigger={
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Organization
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Organization name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Organization description (optional)"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button type="submit" disabled={createOrganization.isPending}>
              {createOrganization.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </Dialog>
  );
}
