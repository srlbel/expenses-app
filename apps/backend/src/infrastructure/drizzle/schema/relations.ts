import { relations } from "drizzle-orm";
import { user, session, account, category, expense } from "./schema";

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account),
	categories: many(category),
	expenses: many(expense),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const categoryRelations = relations(category, ({ one, many }) => ({
	user: one(user, { fields: [category.userId], references: [user.id] }),
	expenses: many(expense),
}));

export const expenseRelations = relations(expense, ({ one }) => ({
	user: one(user, { fields: [expense.userId], references: [user.id] }),
	category: one(category, {
		fields: [expense.categoryId],
		references: [category.id],
	}),
}));
