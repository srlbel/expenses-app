import { Elysia } from "elysia";
import { openapi } from "@elysia/openapi";
import { CONFIG } from "./config";
import { apiRoutes } from "./presentation/api";

const app = new Elysia()
  .use(openapi())
  .use(apiRoutes)
  .listen(CONFIG.port);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
