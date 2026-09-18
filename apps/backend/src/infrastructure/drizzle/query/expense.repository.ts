import { eq, and } from "drizzle-orm";
import { Expense } from "@/domain/expense/expense";
import { ExpenseInterface } from "@/domain/expense/expense.interface";
import { expense } from "@/infrastructure/drizzle/schema/expense";
import { category } from "../schema/category";
import { BaseRepository } from "./base.repository";

export class ExpenseRepository extends BaseRepository implements ExpenseInterface {
	async findAll(userId: string): Promise<Expense[]> {
		return await this.database.query.expense.findMany({
			where: eq(expense.userId, userId),
		});
	}

	async findById(id: string, userId: string): Promise<Expense | undefined> {
		return await this.database.query.expense.findFirst({
			where: and(eq(expense.id, id), eq(expense.userId, userId)),
		});
	}

	async save(entity: Expense): Promise<Expense> {
		const [savedEntity] = await this.database.insert(expense).values(entity).returning();
		return savedEntity;
	}

	async update(entity: Expense): Promise<Expense> {
		const [updatedEntity] = await this.database
			.update(expense)
			.set(entity)
			.where(and(eq(expense.id, entity.id), eq(expense.userId, entity.userId)))
			.returning();
		return updatedEntity;
	}

	async delete(id: string, userId: string): Promise<void> {
		return await this.database
			.delete(expense)
			.where(and(eq(expense.id, id), eq(expense.userId, userId)));
	}

	async findAllExpensesCategoryById(id: string, userId: string): Promise<Expense[]> {
		return await this.database.query.expense.findMany({
			where: and(eq(category.id, id), eq(category.userId, userId)),
		});
	}
}
