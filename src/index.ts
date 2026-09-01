import { Elysia } from "elysia";
import { CONFIG } from "@/config";
import { apiRoutes } from "@/presentation/api";
import { openAPI } from "./presentation/api/openapi.routes";
import { corsHandler } from "./infrastructure/cors/cors";

const app = new Elysia().use(corsHandler).use(openAPI).use(apiRoutes).listen(CONFIG.port);

export type App = typeof app;

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
