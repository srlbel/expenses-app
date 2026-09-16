import { Category } from "./category";

export interface CategoryInterface {
	findAll(userId: string): Promise<Category[]>;
	findById(id: string, userId: string): Promise<Category | undefined>;
	save(entity: Category): Promise<Category>;
	update(entity: Category): Promise<Category>;
	delete(id: string, userId: string): Promise<void>;
}
