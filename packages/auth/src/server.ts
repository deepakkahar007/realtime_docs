import { db, drizzleSchema } from "@repo/drizzle";
import { serverEnv } from "@repo/env";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";

const serverAuth = betterAuth({
	baseURL: "http://localhost:5173",
	trustedOrigins: ["http://localhost:5173", "http://127.0.0.1:5173"],

	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			...drizzleSchema,
		},
	}),
	emailAndPassword: {
		enabled: true,
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 60 * 60 * 24 * 7, // 7 days
			strategy: "jwt",
		},
	},
	socialProviders: {
		google: {
			clientId: serverEnv.GOOGLE_CLIENT_ID,
			clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
		},
	},
	plugins: [organization()],
});

export default serverAuth;
