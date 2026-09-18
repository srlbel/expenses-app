import * as t from "drizzle-orm/sqlite-core";
import { user } from "./user";
import { category } from "./category";

export const expense = t.sqliteTable("expenses", {
	id: t.text().primaryKey(),
	name: t.text().notNull(),
	amount: t.integer().notNull(),
	date: t.text().notNull(),
	description: t.text(),
	userId: t
		.text()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	categoryId: t.text().references(() => category.id, { onDelete: "set null" }),
	createdAt: t
		.text()
		.notNull()
		.$defaultFn(() => new Date().toISOString()),
});
