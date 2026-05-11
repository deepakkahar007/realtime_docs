import { createFileRoute } from "@tanstack/react-router";
import authClient from "@repo/auth/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const handleSignIn = async () => {
		const user = await authClient.signIn.email({
			email: "test@gg.com",
			password: "testtest",
		});
		console.log(user);
	};

	const handleGoogleSignIn = async () => {
		const user = await authClient.signIn.social({
			provider: "google",
		});
		console.log(user);
	};

	const handleGetSession = async () => {
		const session = await authClient.getSession();
		console.log(session);
	};

	const handleSignOut = async () => {
		const result = await authClient.signOut();
		console.log(result);
	};

	const handleSignUp = async () => {
		const user = await authClient.signUp.email({
			name: "Test User",
			email: "test@gg.com",
			password: "testtest",
		});
		console.log(user);
	};

	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>

			<Button onClick={handleSignIn}>Sign in with email</Button>
			<Button onClick={handleSignUp}>Sign up with email</Button>
			<Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
			<Button onClick={handleGetSession}>get session</Button>
			<Button onClick={handleSignOut}>Sign Out</Button>
		</div>
	);
}
