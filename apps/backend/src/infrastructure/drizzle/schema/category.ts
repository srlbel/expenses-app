import * as t from "drizzle-orm/sqlite-core";
import { user } from "./user";

export const category = t.sqliteTable("categories", {
	id: t.text().primaryKey(),
	name: t.text().notNull(),
	color: t.text().notNull(),
	maxAmount: t.integer(),
	userId: t
		.text()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	createdAt: t
		.text()
		.notNull()
		.$defaultFn(() => new Date().toISOString()),
});
