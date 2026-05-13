import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { signOutUser } from "@/helpers/authHelper";
import { Button } from "./ui/button";

const SignOutButton = () => {
	const navigate = useNavigate();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["sign-out-user"],
		mutationFn: signOutUser,
		onSuccess: async (res) => {
			if (res.data?.success) {
				await navigate({ to: "/sign-in" });
				return;
			}

			console.error("Sign out failed", res.error ?? res);
		},
		onError: (error) => {
			console.error("Sign out failed", error);
		},
	});

	async function handleMutation() {
		await mutateAsync();
	}

	return (
		<Button onClick={handleMutation} disabled={isPending}>
			SignOutButton
		</Button>
	);
};

export default SignOutButton;
