import { AppError } from "./app.error";

export class UnathorizedError extends AppError {
	readonly statusCode = 401;
	readonly code = "UNAUTHORIZED";

	constructor(message = "Resource is not accesible") {
		super(message);
	}
}
