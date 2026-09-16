import { t } from "elysia";

export const unathorizedResponse = t.Object({
	code: t.Literal("UNAUTHORIZED"),
	message: t.String(),
});
