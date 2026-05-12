import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/helpers/authHelper";

export const Route = createFileRoute("/")({
	component: Index,
	loader: getAuthSession,
});

function Index() {
	const session = Route.useLoaderData();

	return (
		<div className="p-2">
			{session ? (
				<Button asChild>
					<Link to="/dashboard">Dashboard</Link>
				</Button>
			) : (
				<Button asChild>
					<Link to="/sign-in">Sign In</Link>
				</Button>
			)}
			<h3>Welcome Home!</h3>
		</div>
	);
}
