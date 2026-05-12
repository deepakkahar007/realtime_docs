import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(DASHBOARD)/document/$docId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { docId } = Route.useParams();
	return <div>Hello {docId}</div>;
}
