import { t } from "elysia";

export const notFoundResponse = t.Object({
    code: t.Literal("NOT FOUND"),
    message: t.String()
})