import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = () => (
	<>
		<Outlet />
		<Toaster />
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
