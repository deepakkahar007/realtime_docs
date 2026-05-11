import { defineRelations } from "drizzle-orm";
import * as schema from "./index";

export const relations = defineRelations(schema, (r) => ({
	user: {
		sessions: r.many.session(),
		accounts: r.many.account(),
	},
	session: {
		user: r.one.user({
			from: r.session.userId,
			to: r.user.id,
		}),
	},
	account: {
		user: r.one.user({
			from: r.account.userId,
			to: r.user.id,
		}),
	},
	documentTable: {
		user: r.one.user({
			from: r.documentTable.userId,
			to: r.user.id,
		}),
	},
}));

// export const userRelations = relations(user, ({ many }) => ({
// 	sessions: many(session),
// 	accounts: many(account),
// }));

// export const sessionRelations = relations(session, ({ one }) => ({
// 	user: one(user, {
// 		fields: [session.userId],
// 		references: [user.id],
// 	}),
// }));

// export const accountRelations = relations(account, ({ one }) => ({
// 	user: one(user, {
// 		fields: [account.userId],
// 		references: [user.id],
// 	}),
// }));
