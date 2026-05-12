import { createFileRoute, Outlet } from "@tanstack/react-router";
import { requireAuth } from "@/helpers/authHelper";

export const Route = createFileRoute("/(DASHBOARD)")({
	beforeLoad: requireAuth,
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<h1>dashboard layout</h1>
			<Outlet />
		</div>
	);
}
