import { createFileRoute, Outlet } from "@tanstack/react-router";
import { requireGuest } from "@/helpers/authHelper";

export const Route = createFileRoute("/(AUTH)")({
	beforeLoad: requireGuest,
	component: AuthLayout,
});

function AuthLayout() {
	return (
		<div>
			<h1>Auth Layout</h1>

			<Outlet />
		</div>
	);
}
