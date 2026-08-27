import { t } from "elysia";

export const notFoundResponse = t.Object({
    code: t.Literal("NOT_FOUND"),
    message: t.String()
})