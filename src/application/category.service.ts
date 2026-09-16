import { NotFoundError } from "./errors/not-found.error";
import * as Category from "@/domain/category/category";
import { CategoryRepository } from "@/infrastructure/drizzle/query/category.repository";

export class CategoryService {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async getAllCategories(userId: string): Promise<Category.Category[]> {
		return await this.categoryRepository.findAll(userId);
	}

	async getCategory(id: string, userId: string): Promise<Category.Category> {
		const category = await this.categoryRepository.findById(id, userId);

		if (!category) throw new NotFoundError("Category not found");

		return category;
	}

	async createCategory(
		newEntity: Category.CreateCategory,
		userId: string,
	): Promise<Category.Category> {
		const category: Category.Category = {
			...newEntity,
			id: Bun.randomUUIDv7(),
			userId,
			createdAt: new Date().toISOString(),
		};

		return this.categoryRepository.save(category);
	}

	async updateCategory(
		entity: Category.UpdateCategory,
		id: string,
		userId: string,
	): Promise<Category.Category> {
		const category = await this.categoryRepository.findById(id, userId);

		if (!category) throw new NotFoundError("Category not found");

		const updatedCategory: Category.Category = {
			...category,
			...entity,
			userId: category.userId,
		};

		return this.categoryRepository.update(updatedCategory);
	}

	async deleteCategory(id: string, userId: string): Promise<void> {
		const category = await this.categoryRepository.findById(id, userId);

		if (!category) throw new NotFoundError("Category not found");

		await this.categoryRepository.delete(id, userId);
	}
}
