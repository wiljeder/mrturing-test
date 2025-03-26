import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Organization } from "@/types/index.ts";
import { RefreshCw } from "lucide-react";
import { useUpdateOrganization } from "@/services/organizations/updateOrganization.ts";

const organizationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().optional(),
});

type TOrganizationSchema = z.infer<typeof organizationSchema>;

interface OrganizationDetailsFormProps {
  organization: Organization;
}

export function OrganizationDetailsForm({
  organization,
}: OrganizationDetailsFormProps) {
  const form = useForm<TOrganizationSchema>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: organization.name,
      description: organization.description || "",
    },
  });

  const updateOrganization = useUpdateOrganization();

  const onSubmit = async (data: TOrganizationSchema) => {
    try {
      await updateOrganization.mutateAsync(data);
    } catch (error) {
      console.error("create organization error", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Information</CardTitle>
      </CardHeader>
      <CardContent>
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

            <div className="flex justify-end">
              <Button type="submit" disabled={updateOrganization.isUpdating}>
                {updateOrganization.isUpdating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
