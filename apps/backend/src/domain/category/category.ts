import { t } from "elysia";
import { category as categoryTable } from "@/infrastructure/drizzle/schema/category";
import { createSelectSchema } from "drizzle-typebox";

export const category = createSelectSchema(categoryTable, {
	name: t.String({ maxLength: 20 }),
	maxAmount: t.Nullable(t.Number({ minimum: 1 })),
	id: t.String({ format: "uuid" }),
	createdAt: t.String({ format: "date-time" }),
});
export const createCategory = t.Omit(category, ["id", "createdAt"]);
export const updateCategory = t.Partial(createCategory);

export type Category = (typeof category)["static"];
export type CreateCategory = (typeof createCategory)["static"];
export type UpdateCategory = (typeof updateCategory)["static"];
