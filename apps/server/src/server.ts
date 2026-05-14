import { cors } from "@elysia/cors";
import { openapi } from "@elysia/openapi";
import { serverEnv } from "@repo/env";
import { Elysia } from "elysia";
import { z } from "zod";
import { betterAuthView } from "../lib/auth";
import { websocket } from "./lib/websocket";

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
	.use(websocket)
	.all("/api/auth/*", betterAuthView)
	.get("/", { msg: "hello elysia" })
	

export type App = typeof app;

export default app;
