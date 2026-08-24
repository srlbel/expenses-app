import Elysia from "elysia";
import { expensesRoutes } from "./api/expense.routes";

export const apiRoutes = new Elysia({ prefix: '/api' })
    .use(expensesRoutes)