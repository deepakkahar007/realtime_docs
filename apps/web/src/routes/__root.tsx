import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
	<>
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
