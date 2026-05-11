import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@repo/drizzle";
import { serverEnv } from "@repo/env";

const serverAuth = betterAuth({
	baseURL: "http://localhost:3000",
	trustedOrigins: ["http://localhost:5173", "http://127.0.0.1:5173"],

	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: serverEnv.GOOGLE_CLIENT_ID,
			clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
		},
	},
});

export default serverAuth;
