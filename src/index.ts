import { Elysia } from "elysia";
import { openapi } from "@elysia/openapi";
import { CONFIG } from "./config";
import { apiRoutes } from "./presentation/api";

const app = new Elysia()
  .use(openapi())
  .get("/", () => "Hello Elysia")
  .use(apiRoutes)
  .listen(CONFIG.port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
