import { defineRelations } from "drizzle-orm";
import * as schema from "./index";

export const relations = defineRelations(schema, (r) => ({
	documentTable: {
		user: r.one.user({
			from: r.documentTable.userId,
			to: r.user.id,
		}),
	},

	user: {
		sessions: r.many.session(),
		accounts: r.many.account(),
		members: r.many.member(),
		invitations: r.many.invitation(),
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
	organization: {
		members: r.many.member(),
		invitations: r.many.invitation(),
	},
	member: {
		user: r.one.user({
			from: r.member.userId,
			to: r.user.id,
		}),
		organization: r.one.organization({
			from: r.member.organizationId,
			to: r.organization.id,
		}),
	},
	invitation: {
		user: r.one.user({
			from: r.invitation.inviterId,
			to: r.user.id,
		}),
		organization: r.one.organization({
			from: r.invitation.organizationId,
			to: r.organization.id,
		}),
	},
}));

// export const userRelations = relations(user, ({ many }) => ({
// 	sessions: many(session),
// 	accounts: many(account),
// 	members: many(member),
// 	invitations: many(invitation),
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

// export const organizationRelations = relations(organization, ({ many }) => ({
// 	members: many(member),
// 	invitations: many(invitation),
// }));

// export const memberRelations = relations(member, ({ one }) => ({
// 	organization: one(organization, {
// 		fields: [member.organizationId],
// 		references: [organization.id],
// 	}),
// 	user: one(user, {
// 		fields: [member.userId],
// 		references: [user.id],
// 	}),
// }));

// export const invitationRelations = relations(invitation, ({ one }) => ({
// 	organization: one(organization, {
// 		fields: [invitation.organizationId],
// 		references: [organization.id],
// 	}),
// 	user: one(user, {
// 		fields: [invitation.inviterId],
// 		references: [user.id],
// 	}),
// }));
