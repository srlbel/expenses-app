import { Elysia, t } from "elysia";
import { ExpenseService } from "@/application/expense.service";
import { ExpenseRepository } from "@/infrastructure/drizzle/query/expense.repository";
import { db } from "@/infrastructure/drizzle/db";
import * as Expense from "@/domain/expense/expense";
import { Errors } from "@/domain/errors";
import { authRoutes as AuthHandler } from "./auth.routes";

const repository = new ExpenseRepository(db);
const service = new ExpenseService(repository);

export const expensesRoutes = new Elysia({
	prefix: "/expenses",
	name: "Expenses",
	tags: ["Expenses"],
})
	.use(AuthHandler)
	.model({
		Expense: Expense.expense,
		CreateExpense: Expense.createExpense,
		UpdateExpense: Expense.updateExpense,
	})
	.get("/", async ({ user }) => await service.getAllExpenses(user.id), {
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
		async ({ params: { id }, user }) => {
			return await service.getExpense(id, user.id);
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
		async ({ body, status, user }) => {
			const entity = await service.createExpense(body, user.id);
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
		async ({ body, params: { id }, user }) => {
			return await service.updateExpense(body, id, user.id);
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
		async ({ params: { id }, status, user }) => {
			await service.deleteExpense(id, user.id);
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
