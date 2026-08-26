import { Elysia, t } from "elysia";
import { ExpenseService } from "../../application/expense.service";
import { ExpenseRepository } from "../../infraestructure/query/expense.repository";
import { db } from "../../infraestructure/drizzle/db";
import * as Expense from "../../domain/expense/expense";

const repository = new ExpenseRepository(db);
const service = new ExpenseService(repository);

export const expensesRoutes = new Elysia({ prefix: '/expenses', name: 'Expenses', tags: ['Expenses'] })
    .get(
        '/',
        () => service.getAllExpenses(),
        {
            response: t.Array(Expense.expense)
        }
    )
    .get('/:id', 
        ({ params: { id } }) => service.getExpense(id),
        {
            params: t.Object({
                id: t.String()
           })
        }
    )
    .post(
        '/',
        ({ body }) => service.createExpense(body),
        {
            body: Expense.createExpense
        }
    )
    .put(
        '/',
        ({ body }) => service.updateExpense(body),
        {
            body: Expense.expense
        }
    )
    .delete(
        ':id',
        ({ params: { id } }) => service.deleteExpense(id),
        {
            params: t.Object({
                id: t.String()
            })
        }
    )
