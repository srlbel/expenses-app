import { eq } from "drizzle-orm";
import { Expense } from "@/domain/expense/expense";
import { ExpenseInterface } from "@/domain/expense/expense.interface";
import { db } from "@/infrastructure/drizzle/db";
import { expense } from "@/infrastructure/drizzle/schema/expense";

export class ExpenseRepository implements ExpenseInterface {
    constructor (private readonly database: typeof db) {}

    async findAll(): Promise<Expense[]> {
        return await this.database.query.expense.findMany({});
    }

    async findById(id: string): Promise<Expense | undefined> {
        return await this.database.query.expense.findFirst({
            where(fields, operators) { return operators.eq(fields.id, id)}
        })
    }

    async save(entity: Expense): Promise<Expense> {
        const [savedEntity] = await this.database.insert(expense).values(entity).returning();
        return savedEntity;
    }

    async update(entity: Expense): Promise<Expense> {
        const [updatedEntity] = await this.database.update(expense).set(entity).where(eq(expense.id, entity.id)).returning();
        return updatedEntity;
    }

    async delete(id: string): Promise<void> {
        return await this.database.delete(expense).where(eq(expense.id, id));
    }
}