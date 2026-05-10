import { uuid, timestamp, boolean } from "drizzle-orm/pg-core";

export const id = uuid("id").primaryKey().defaultRandom();

export const isActive = boolean("is_active").default(false);

export const createdAt = timestamp("created_at").defaultNow();

export const updatedAt = timestamp("updated_at")
  .defaultNow()
  .$onUpdate(() => new Date());
