import { notFoundResponse } from "./notFound";
import { unathorizedResponse } from "./unauthorized";

export const Errors = {
	notFoundResponse,
	unathorizedResponse,
} as const;
