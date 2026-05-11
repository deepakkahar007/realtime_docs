import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./models";
import { relations } from "./models/relations";
import { serverEnv } from "@repo/env";

const client = postgres(serverEnv.DATABASE_URL);

export const drizzleSchema = {
	...schema,
	relations,
};

export const db = drizzle({ client, relations });
