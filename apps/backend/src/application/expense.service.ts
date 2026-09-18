import { NotFoundError } from "@/application/errors/not-found.error";
import * as Expense from "@/domain/expense/expense";
import { CategoryRepository } from "@/infrastructure/drizzle/query/category.repository";
import { ExpenseRepository } from "@/infrastructure/drizzle/query/expense.repository";

export class ExpenseService {
	constructor(
		private readonly expenseRepository: ExpenseRepository,
		private readonly categoryRespotory: CategoryRepository,
	) {}

	async getAllExpenses(userId: string): Promise<Expense.Expense[]> {
		return await this.expenseRepository.findAll(userId);
	}

	async getExpense(id: string, userId: string): Promise<Expense.Expense> {
		const expense = await this.expenseRepository.findById(id, userId);

		if (!expense) throw new NotFoundError("Expense not found");

		return expense;
	}

	async createExpense(
		newEntity: Expense.CreateExpense,
		userId: string,
	): Promise<Expense.Expense> {
		const expense: Expense.Expense = {
			...newEntity,
			id: Bun.randomUUIDv7(),
			userId,
			createdAt: new Date().toISOString(),
		};

		return this.expenseRepository.save(expense);
	}

	async updateExpense(
		entity: Expense.UpdateExpense,
		id: string,
		userId: string,
	): Promise<Expense.Expense> {
		const expense = await this.expenseRepository.findById(id, userId);

		if (!expense) throw new NotFoundError("Expense not found");

		const updatedExpense: Expense.Expense = {
			...expense,
			...entity,
			userId: expense.userId,
		};

		return this.expenseRepository.update(updatedExpense);
	}

	async deleteExpense(id: string, userId: string): Promise<void> {
		const expense = await this.expenseRepository.findById(id, userId);

		if (!expense) throw new NotFoundError("Expense not found");

		await this.expenseRepository.delete(id, userId);
	}

	async getAllExpensesByCategoryId(id: string, userId: string): Promise<Expense.Expense[]> {
		const category = await this.categoryRespotory.findById(id, userId);

		if (!category) throw new NotFoundError("Category not found");

		return this.expenseRepository.findAllExpensesCategoryById(id, userId);
	}
}
