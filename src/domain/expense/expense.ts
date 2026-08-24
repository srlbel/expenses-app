import { t } from "elysia";
import { expense as expenseTable} from "../../infraestructure/database/schema/expense";
import { createSelectSchema } from "drizzle-typebox";

export const expense = createSelectSchema(expenseTable)
export const createExpense = t.Omit(expense, ['id', 'createdAt'])
export const updateExpense = t.Partial(createExpense);

export type Expense = typeof expense['static'];
export type CreateExpense = typeof createExpense['static'];
export type UpdateExpense = typeof updateExpense['static'];