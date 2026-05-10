import { defineConfig } from "drizzle-kit";
import { serverEnv } from "@repo/env";

export default defineConfig({
  out: "./src/migrations",
  schema: "./src/models/index.ts",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: serverEnv.DATABASE_URL,
  },
});
