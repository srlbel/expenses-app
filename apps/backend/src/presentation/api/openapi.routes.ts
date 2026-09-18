import Elysia from "elysia";
import { openapi } from "@elysia/openapi";
import { OpenAPI } from "@/infrastructure/auth/auth";

export const openAPI = new Elysia().use(
	openapi({
		documentation: {
			info: {
				title: "Expenses App Documentation",
				version: "1.0.0",
			},
			components: await OpenAPI.components,
			paths: await OpenAPI.getPaths(),
		},
	}),
);
