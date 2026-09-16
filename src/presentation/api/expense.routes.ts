import { Elysia, t } from "elysia";
import * as Expense from "@/domain/expense/expense";
import { Errors } from "@/domain/errors";
import { authRoutes as AuthHandler } from "./auth.routes";
import { dependencies } from "./dependencies";

export const expensesRoutes = new Elysia({
	prefix: "/expenses",
	name: "Expenses",
	tags: ["Expenses"],
})
	.use(AuthHandler)
	.use(dependencies)
	.model({
		Expense: Expense.expense,
		CreateExpense: Expense.createExpense,
		UpdateExpense: Expense.updateExpense,
	})
	.get("/", async ({ user, expenseService }) => await expenseService.getAllExpenses(user.id), {
		auth: true,
		detail: {
			summary: "List all expenses",
		},
		response: {
			200: t.Array(Expense.expense),
			401: Errors.unathorizedResponse,
		},
	})
	.get(
		"/:id",
		async ({ params: { id }, user, expenseService }) => {
			return await expenseService.getExpense(id, user.id);
		},
		{
			auth: true,
			detail: {
				summary: "Get an expense by Id",
			},
			params: t.Object({
				id: t.String({ format: "uuid" }),
			}),
			response: {
				200: Expense.expense,
				404: Errors.notFoundResponse,
				401: Errors.unathorizedResponse,
			},
		},
	)
	.post(
		"/",
		async ({ body, status, user, expenseService }) => {
			const entity = await expenseService.createExpense(body, user.id);
			return status(201, entity);
		},
		{
			auth: true,
			detail: {
				summary: "Create an expense",
			},
			body: Expense.createExpense,
			response: {
				201: Expense.expense,
				401: Errors.unathorizedResponse,
			},
		},
	)
	.put(
		"/:id",
		async ({ body, params: { id }, user, expenseService }) => {
			return await expenseService.updateExpense(body, id, user.id);
		},
		{
			auth: true,
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
				401: Errors.unathorizedResponse,
			},
		},
	)
	.delete(
		"/:id",
		async ({ params: { id }, status, user, expenseService }) => {
			await expenseService.deleteExpense(id, user.id);
			return status(204, undefined);
		},
		{
			auth: true,
			detail: {
				summary: "Delete an expense by Id",
			},
			params: t.Object({
				id: t.String({ format: "uuid" }),
			}),
			response: {
				204: t.Void(),
				401: Errors.unathorizedResponse,
			},
		},
	);
