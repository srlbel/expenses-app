import { t } from "elysia";
import { expense as expenseTable} from "@/infrastructure/drizzle/schema/expense";
import { createSelectSchema } from "drizzle-typebox";

export const expense = createSelectSchema(expenseTable, {
    amount: t.Number({ minimum: 0 }),
    date: t.String({ format: "date-time" }),
    createdAt: t.String({ format: "date-time" }),
    id: t.String({ format: 'uuid' }),
    name: t.String({ maxLength: 50 })
})
export const createExpense = t.Omit(expense, ['id', 'createdAt'])
export const updateExpense = t.Partial(createExpense);

export type Expense = typeof expense['static'];
export type CreateExpense = typeof createExpense['static'];
export type UpdateExpense = typeof updateExpense['static'];