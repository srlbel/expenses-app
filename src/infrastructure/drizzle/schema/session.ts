import { sqliteTable } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { user } from "./user";

export const session = sqliteTable(
	"session",
	{
		id: t.text("id").primaryKey(),
		userId: t
			.text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		token: t.text("token").notNull().unique(),
		expiresAt: t.integer("expires_at", { mode: "timestamp_ms" }).notNull(),
		ipAddress: t.text("ip_address"),
		userAgent: t.text("user_agent"),
		createdAt: t.integer("created_at", { mode: "timestamp_ms" }).notNull(),
		updatedAt: t.integer("updated_at", { mode: "timestamp_ms" }).notNull(),
	},
	(table) => [t.index("session_userId_idx").on(table.userId)],
);
