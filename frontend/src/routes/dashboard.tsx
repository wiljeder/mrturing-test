import { createFileRoute } from "@tanstack/react-router";
import { useAuthenticated } from "@/utils/useAuthenticated.ts";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  useAuthenticated();

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
