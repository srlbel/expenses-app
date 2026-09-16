import { Expense } from "./expense";

export interface ExpenseInterface {
	findAll(userId: string): Promise<Expense[]>;
	findById(id: string, userId: string): Promise<Expense | undefined>;
	save(entity: Expense): Promise<Expense>;
	update(entity: Expense): Promise<Expense>;
	delete(id: string, userId: string): Promise<void>;
}
