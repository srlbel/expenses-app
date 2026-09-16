import { eq, and } from "drizzle-orm";
import { Expense } from "@/domain/expense/expense";
import { ExpenseInterface } from "@/domain/expense/expense.interface";
import { db } from "@/infrastructure/drizzle/db";
import { expense } from "@/infrastructure/drizzle/schema/expense";

export class ExpenseRepository implements ExpenseInterface {
	constructor(private readonly database: typeof db) {}

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
}
