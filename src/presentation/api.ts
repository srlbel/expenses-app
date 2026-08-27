import Elysia from "elysia";
import { expensesRoutes } from "@/presentation/api/expense.routes";
import { AppError } from "@/application/errors/app.error";

export const apiRoutes = new Elysia({ prefix: "/api" })
	.onError(({ error, status }) => {
		if (error instanceof AppError) {
			return status(error.statusCode, {
				code: error.code,
				message: error.message,
			});
		}

		return status(500, {
			code: "INTERNAL_SERVER_ERROR",
			message: "Internal server error",
		});
	})
	.use(expensesRoutes);
