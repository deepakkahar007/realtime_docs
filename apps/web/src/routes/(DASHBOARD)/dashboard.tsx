import { createFileRoute, Link } from "@tanstack/react-router";
import SignOutButton from "@/components/SignOutButton";
import { getAuthSession } from "@/helpers/authHelper";

export const Route = createFileRoute("/(DASHBOARD)/dashboard")({
	component: RouteComponent,
	loader: getAuthSession,
});

function RouteComponent() {
	const session = Route.useLoaderData();

	const document = ["document_1", "document_2", "document_3", "document_4"];

	return (
		<div>
			{!session?.data || <SignOutButton />}
			<h1>document list</h1>

			{document.map((doc) => (
				<Link key={doc} to="/document/$docId" params={{ docId: doc }}>
					{doc}
				</Link>
			))}
		</div>
	);
}
