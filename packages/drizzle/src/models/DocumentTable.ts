import { pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { id, createdAt, isActive, updatedAt } from "./modelsHelper";

export const documentTable = pgTable(
	"document",
	{
		id,

		title: text("title").notNull(),
		content: text("content").notNull(),
		userId: text("user_id").notNull(),

		isActive,
		createdAt,
		updatedAt,
	},
	(t) => [uniqueIndex("document_user_id_idx").on(t.userId)],
);
