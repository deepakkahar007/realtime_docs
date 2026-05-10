import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import path from "path";
import dotenv from "dotenv";

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
