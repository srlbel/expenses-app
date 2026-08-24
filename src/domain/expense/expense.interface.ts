import { Expense } from "./expense";

export interface ExpenseInterface {
    findAll(): Promise<Expense[]>;
    findById(id: string): Promise<Expense | undefined>;
    save(entity: Expense): Promise<Expense>;
    update(entity: Expense): Promise<Expense>;
    delete(id: string): Promise<void>;
}