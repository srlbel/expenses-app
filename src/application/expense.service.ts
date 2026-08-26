import * as Expense from "../domain/expense/expense"
import { ExpenseRepository } from "../infrastructure/drizzle/query/expense.repository"

export class ExpenseService {
    constructor (
        private readonly expenseRepository: ExpenseRepository
    ) {}

    async getAllExpenses(): Promise<Expense.Expense[]> {
        return this.expenseRepository.findAll()
    }

    async getExpense(id: string): Promise<Expense.Expense | undefined> {
        return this.expenseRepository.findById(id);
    }

    async createExpense(newEntity: Expense.CreateExpense): Promise<Expense.Expense> {
        const expense: Expense.Expense = {
            ...newEntity,
            id: Bun.randomUUIDv7(),
            createdAt: new Date().toISOString()
        }

        return this.expenseRepository.save(expense);
    }

    async updateExpense(entity: Expense.UpdateExpense, id: string): Promise<Expense.Expense> {
        const expense = await this.expenseRepository.findById(id);
        
        if (!expense) throw new Error("Entity not found");

        const updatedExpense: Expense.Expense = {
            ...expense,
            ...entity
        }

        return this.expenseRepository.update(updatedExpense);
    }

    async deleteExpense(id: string): Promise<void> {
        const expense = this.expenseRepository.findById(id);
        
        if (!expense) throw new Error("Entity not found");

        await this.expenseRepository.delete(id)
    }
}