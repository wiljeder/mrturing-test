import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen.ts";
import "./index.css";
import { NotFound } from "@/404.tsx";
import { Toaster } from "sonner";

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <NotFound />,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Toaster
        toastOptions={{
          closeButton: true,
        }}
      />
      <RouterProvider router={router} />
    </StrictMode>
  );
}
