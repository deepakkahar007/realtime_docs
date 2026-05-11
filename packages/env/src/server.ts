import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
	path: path.resolve(process.cwd(), "../../.env"),
});

export const serverEnv = createEnv({
	server: {
		CLIENT_URL: z.url(),
		SERVER_PORT: z.coerce.number(),
		BETTER_AUTH_URL: z.string(),
		BETTER_AUTH_SECRET: z.string(),
		DB_NAME: z.string(),
		DB_USER: z.string(),
		DB_PASSWORD: z.string(),
		DB_HOST: z.string(),
		DB_PORT: z.string(),
		REDIS_URL: z.string(),
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
	},
	createFinalSchema: (env) =>
		z.object(env).transform((val) => {
			const { DB_HOST, DB_PASSWORD, DB_USER, DB_PORT, DB_NAME, ...rest } = val;
			return {
				...rest,
				DATABASE_URL: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
			};
		}),
	emptyStringAsUndefined: true,
	runtimeEnv: process.env,
});
