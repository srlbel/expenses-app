import { Elysia } from "elysia";
import { createContainer } from "../../container";

const container = createContainer();

export const dependencies = new Elysia({
	name: "dependencies",
})
	.decorate("categoryService", container.services.categoryService)
	.decorate("expenseService", container.services.expenseService);
