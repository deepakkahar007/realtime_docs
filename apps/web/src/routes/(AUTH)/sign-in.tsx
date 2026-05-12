import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { handleSignIn } from "@/helpers/authHelper";

export const Route = createFileRoute("/(AUTH)/sign-in")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["sign-in-user"],
		mutationFn: async () => await handleSignIn(),
		onSuccess: async (res) => {
			if (res.data?.user) {
				await navigate({ to: "/dashboard" });
				return;
			}

			console.error("Sign in failed", res.error ?? res);
		},
		onError: (error) => {
			console.error("Sign in failed", error);
		},
	});

	async function onSignInClick() {
		await mutateAsync();
	}

	return (
		<div>
			<Button onClick={onSignInClick} disabled={isPending}>
				sign in with email
			</Button>
		</div>
	);
}
