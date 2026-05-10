import { cors } from "@elysia/cors";
import { openapi } from "@elysia/openapi";
import { Elysia, type Context } from "elysia";
import { z } from "zod";
import auth from "@repo/auth/server";
import { serverEnv } from "@repo/env";

const betterAuthView = (context: Context) => {
	const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"];
	// validate request method
	if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
		return auth.handler(context.request);
	} else {
		context.status(405);
	}
};

const app = new Elysia()
	.use(
		cors({
			origin: [serverEnv.CLIENT_URL],
			credentials: true,
		}),
	)
	.use(
		openapi({
			mapJsonSchema: {
				zod: z.toJSONSchema,
			},
		}),
	)
	.all("/api/auth/*", betterAuthView)
	.get("/", { msg: "hello elysia" })
	.listen(serverEnv.SERVER_PORT, ({ hostname, port }) => {
		console.log(`server is running on ${hostname}:${port}`);
	});

export type App = typeof app;

export default app;
