import { Elysia, t } from "elysia";
import { ExpenseService } from "@/application/expense.service";
import { ExpenseRepository } from "@/infrastructure/drizzle/query/expense.repository";
import { db } from "@/infrastructure/drizzle/db";
import * as Expense from "@/domain/expense/expense";
import { Errors } from "@/domain/errors";

const repository = new ExpenseRepository(db);
const service = new ExpenseService(repository);

export const expensesRoutes = new Elysia({
	prefix: "/expenses",
	name: "Expenses",
	tags: ["Expenses"],
})
    .model({
        Expense: Expense.expense,
        CreateExpense: Expense.createExpense,
        UpdateExpense: Expense.updateExpense
    })
	.get("/", async () => await service.getAllExpenses(), {
		detail: {
			summary: "List all expenses",
		},
		response: {
			200: t.Array(Expense.expense),
		},
	})
	.get(
		"/:id",
		async ({ params: { id } }) => {
			return await service.getExpense(id);
		},
		{
			detail: {
				summary: "Get an expense by Id",
			},
			params: t.Object({
				id: t.String({ format: "uuid" }),
			}),
			response: {
				200: Expense.expense,
				404: Errors.notFoundResponse,
			},
		},
	)
	.post(
		"/",
		async ({ body, status }) => {
			const entity = await service.createExpense(body);
			return status(201, entity);
		},
		{
			detail: {
				summary: "Create an expense",
			},
			body: Expense.createExpense,
			response: {
				201: Expense.expense,
			},
		},
	)
	.put(
		"/:id",
		async ({ body, params: { id } }) => {
			return await service.updateExpense(body, id);
		},
		{
			detail: {
				summary: "Update an expense by Id",
			},
			body: Expense.updateExpense,
			params: t.Object({
				id: t.String({ format: "uuid" }),
			}),
			response: {
				200: Expense.expense,
				404: Errors.notFoundResponse,
			},
		},
	)
	.delete(
		"/:id",
		async ({ params: { id }, status }) => {
			await service.deleteExpense(id);
			return status(204, undefined);
		},
		{
			detail: {
				summary: "Delete an expense by Id",
			},
			params: t.Object({
				id: t.String({ format: "uuid" }),
			}),
			response: {
				204: t.Void(),
			},
		},
	);
