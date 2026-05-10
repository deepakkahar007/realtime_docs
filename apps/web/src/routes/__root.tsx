import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => {
    return (
      <div>
        <h1>not found</h1>
      </div>
    );
  },
  errorComponent: ({ error }) => {
    return (
      <div>
        <h1>{error?.message || "Internal server error"}</h1>
      </div>
    );
  },
});
