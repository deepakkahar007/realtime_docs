import authClient from "@repo/auth/client";
import { redirect } from "@tanstack/react-router";

export const requireAuth = async () => {
	const session = await authClient.getSession();

	if (!session.data?.user) {
		throw redirect({
			to: "/sign-in",
		});
	}

	return session;
};

export const requireGuest = async () => {
	const session = await authClient.getSession();

	if (session.data?.user) {
		throw redirect({
			to: "/dashboard",
		});
	}

	return session;
};

export const handleSignIn = async () => {
	const user = await authClient.signIn.email({
		email: "test@gg.com",
		password: "testtest",
	});

	return user;
};

export const handleGoogleSignIn = async () => {
	const user = await authClient.signIn.social({
		provider: "google",
	});
	console.log(user);
};

export const getAuthSession = async () => {
	const session = await authClient.getSession();
	return session.data?.user ? session : null;
};

export const signOutUser = async () => {
	const result = await authClient.signOut();

	return result;
};

export const handleSignUp = async () => {
	const user = await authClient.signUp.email({
		name: "Test User",
		email: "test@gg.com",
		password: "testtest",
	});
	console.log(user);
};
