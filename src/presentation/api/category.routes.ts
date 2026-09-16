import Elysia, { t } from "elysia";
import * as Category from "@/domain/category/category";
import * as Expense from "@/domain/expense/expense";
import { authRoutes as AuthHandler } from "./auth.routes";
import { Errors } from "@/domain/errors";
import { dependencies } from "./dependencies";

export const categoryRoutes = new Elysia({
	prefix: "/categories",
	name: "Categories",
	tags: ["Categories"],
})
	.use(AuthHandler)
	.use(dependencies)
	.model({
		Category: Category.category,
		CreateCategory: Category.createCategory,
		UpdateCategory: Category.updateCategory,
	})
	.get(
		"/",
		async ({ user, categoryService }) => {
			return await categoryService.getAllCategories(user.id);
		},
		{
			auth: true,
			detail: {
				summary: "List all categories",
			},
			response: {
				200: t.Array(Category.category),
				401: Errors.unathorizedResponse,
			},
		},
	)
	.get(
		"/:id",
		async ({ params: { id }, user, categoryService }) => {
			return await categoryService.getCategory(id, user.id);
		},
		{
			auth: true,
			detail: {
				summary: "Get a category by id",
			},
			params: t.Object({
				id: t.String({ format: "uuid" }),
			}),
			response: {
				200: Category.category,
				404: Errors.notFoundResponse,
				401: Errors.unathorizedResponse,
			},
		},
	)
	.get(
		"/:id/expenses",
		async ({ params: { id }, user, expenseService }) => {
			return await expenseService.getAllExpensesByCategoryId(id, user.id);
		},
		{
			auth: true,
			detail: {
				summary: "Get expenses by category id",
				tags: ["Expenses", "Categories"],
			},
			params: t.Object({
				id: t.String({ format: "uuid" }),
			}),
			response: {
				200: t.Array(Expense.expense),
				401: Errors.unathorizedResponse,
				404: Errors.notFoundResponse,
			},
		},
	)
	.post(
		"/",
		async ({ body, status, user, categoryService }) => {
			const entity = await categoryService.createCategory(body, user.id);
			return status(201, entity);
		},
		{
			auth: true,
			detail: {
				summary: "Create a category",
			},
			body: Category.createCategory,
			response: {
				201: Category.category,
				401: Errors.unathorizedResponse,
			},
		},
	)
	.put(
		"/:id",
		async ({ body, params: { id }, user, categoryService }) => {
			return await categoryService.updateCategory(body, id, user.id);
		},
		{
			auth: true,
			detail: {
				summary: "Update a category by id",
			},
			body: Category.updateCategory,
			params: t.Object({
				id: t.String({ format: "uuid" }),
			}),
			response: {
				200: Category.category,
				404: Errors.notFoundResponse,
				401: Errors.unathorizedResponse,
			},
		},
	)
	.delete(
		"/:id",
		async ({ params: { id }, status, user, categoryService }) => {
			await categoryService.deleteCategory(id, user.id);
			return status(204, undefined);
		},
		{
			auth: true,
			detail: {
				summary: "Delete a category by Id",
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
