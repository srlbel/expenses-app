import { Elysia, t } from "elysia";
import { ExpenseService } from "../../application/expense.service";
import { ExpenseRepository } from "../../infrastructure/drizzle/query/expense.repository";
import { db } from "../../infrastructure/drizzle/db";
import * as Expense from "../../domain/expense/expense";

const repository = new ExpenseRepository(db);
const service = new ExpenseService(repository);

export const expensesRoutes = new Elysia({ prefix: '/expenses', name: 'Expenses', tags: ['Expenses'] })
    .get(
        '/',
        async () => await service.getAllExpenses(),
        {
            detail: {
                summary: "List all expenses"
            }, 
            response: {
                [200]: t.Array(Expense.expense)
            }
        }
    )
    .get('/:id', 
        async ({ params: { id }, status }) => { 
            const entity = await service.getExpense(id);
            if (entity == undefined) { 
                return status(404, "Not Found");
            }
            return entity;
        },
        {
            detail: {
                summary: "Get an expense by Id"
            },
            params: t.Object({
                id: t.String({ format: "uuid" })
            }),
            response: {
                [200]: Expense.expense,
                [404]: t.Literal("Not Found")
            }
        }
    )
    .post(
        '/',
        async ({ body, status }) => {
            const entity = await service.createExpense(body)
            return status(201, entity);
        },
        {
            detail: {
                summary: "Create an expense"
            },
            body: Expense.createExpense,
            response: {
                [201]: Expense.expense
            }
        }
    )
    .put(
        '/:id',
        async ({ body, params: { id }, status }) => {
            const entity = await service.updateExpense(body, id);
            if (entity == undefined) {
                return status(404, "Not Found")
            }
            return status(200, entity);
        },
        {
            detail: {
                summary: "Update an expense by Id"
            },
            body: Expense.updateExpense,
            params: t.Object({
                id: t.String({ format: "uuid" })
            }),
            response: {
                [200]: Expense.expense,
                [404]: t.Literal("Not Found")
            }
        }
    )
    .delete(
        '/:id',
        async ({ params: { id }, status }) => {
            await service.deleteExpense(id);
            return status(204, "");
        },
        {
            detail: {
                summary: "Delete an expense by Id",
            },
            params: t.Object({
                id: t.String({ format: "uuid" })
            }),
            response: {
                [204]: t.Literal("")
            }
        }
    )
