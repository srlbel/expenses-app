import * as t from "drizzle-orm/sqlite-core";

export const expense = t.sqliteTable(
    'expenses',
    {
        id: t.text().primaryKey(),
        name: t.text().notNull(),
        amount: t.integer().notNull(),
        date: t.text().notNull(),
        description: t.text(),
        createdAt: t.text().notNull().$defaultFn(() => new Date().toISOString())
    }
)