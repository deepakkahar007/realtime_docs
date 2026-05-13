import path from "node:path";
import { createEnv } from "@t3-oss/env-core";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
	path: path.resolve(process.cwd(), "../../.env"),
});

export const clientEnv = createEnv({
	client: {
		VITE_APP_NAME: z.string().optional(),
	},
	clientPrefix: "VITE_",
	emptyStringAsUndefined: true,
	runtimeEnv: process.env,
});
