import { cors } from "@elysia/cors";
import { openapi } from "@elysia/openapi";
import { serverEnv } from "@repo/env";
import { Elysia } from "elysia";
import { z } from "zod";
import { betterAuthView } from "../lib/auth";

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
	.listen(serverEnv.SERVER_PORT);

export type App = typeof app;

export default app;
