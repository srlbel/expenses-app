import { Elysia } from "elysia";
import { openapi, fromTypes } from "@elysia/openapi";
import { CONFIG } from "@/config";
import { apiRoutes } from "@/presentation/api";

const app = new Elysia()
	.use(
		openapi({
			references: fromTypes(),
            documentation: {
                info: {
                    title: "Expenses App Documentation",
                    version: "1.0.0"
                }
            }
		}),
	)
	.use(apiRoutes)
	.listen(CONFIG.port);

export type App = typeof app;

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
