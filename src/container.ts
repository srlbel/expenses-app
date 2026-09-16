import { CategoryRepository } from "./infrastructure/drizzle/query/category.repository";
import { ExpenseRepository } from "./infrastructure/drizzle/query/expense.repository";

import { CategoryService } from "./application/category.service";
import { ExpenseService } from "./application/expense.service";

export function createContainer() {
	// Repositories
	const categoryRepository = new CategoryRepository();
	const expenseRepository = new ExpenseRepository();

	// Services
	const categoryService = new CategoryService(categoryRepository);

	const expenseService = new ExpenseService(expenseRepository, categoryRepository);

	return {
		repositories: {
			categoryRepository,
			expenseRepository,
		},

		services: {
			categoryService,
			expenseService,
		},
	};
}
