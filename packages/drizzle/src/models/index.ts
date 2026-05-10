import { pgTable, varchar, text } from "drizzle-orm/pg-core";
import { id, isActive, createdAt, updatedAt } from "./modelsHelper";

export const UserTable = pgTable("user", {
  id,

  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
  isActive,

  createdAt,
  updatedAt,
});
