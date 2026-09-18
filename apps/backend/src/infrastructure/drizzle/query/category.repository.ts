import { CategoryInterface } from "@/domain/category/category.interface";
import { Category } from "@/domain/category/category";
import { and, eq } from "drizzle-orm";
import { category } from "../schema/category";
import { BaseRepository } from "./base.repository";

export class CategoryRepository extends BaseRepository implements CategoryInterface {
	async findAll(userId: string): Promise<Category[]> {
		return await this.database.query.category.findMany({
			where: eq(category.userId, userId),
		});
	}

	async findById(id: string, userId: string): Promise<Category | undefined> {
		return await this.database.query.category.findFirst({
			where: and(eq(category.id, id), eq(category.userId, userId)),
		});
	}

	async save(entity: Category): Promise<Category> {
		const [savedEntity] = await this.database.insert(category).values(entity).returning();
		return savedEntity;
	}

	async update(entity: Category): Promise<Category> {
		const [updatedEntity] = await this.database
			.update(category)
			.set(entity)
			.where(and(eq(category.id, entity.id), eq(category.userId, entity.userId)))
			.returning();
		return updatedEntity;
	}

	async delete(id: string, userId: string): Promise<void> {
		return await this.database
			.delete(category)
			.where(and(eq(category.id, id), eq(category.userId, userId)));
	}
}
