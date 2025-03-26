import { Link } from "@tanstack/react-router";
import { useUserStore } from "@/stores/user.store.ts";
import { Button } from "@/components/ui/button.tsx";
import { LayoutDashboard, Users, Building2, LogOut } from "lucide-react";

export function Sidebar() {
  const { user, logout } = useUserStore();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-card shadow-lg p-4">
      <div className="flex flex-col h-full">
        <div className="space-y-2 mb-8">
          <h2 className="text-2xl font-bold">Org Manager</h2>
          <div className="text-sm text-muted-foreground">{user?.name}</div>
        </div>

        <nav className="space-y-2 flex-1">
          <Link
            to="/"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/users"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
          >
            <Users className="h-5 w-5" />
            Users
          </Link>
          <Link
            to="/organizations"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
          >
            <Building2 className="h-5 w-5" />
            Organizations
          </Link>
        </nav>

        <Button
          variant="ghost"
          className="mt-auto flex items-center gap-2 justify-start"
          onClick={() => logout()}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
