import { UnathorizedError } from "@/application/errors/unauthorized.error";
import { auth } from "@/infrastructure/auth/auth";
import Elysia from "elysia";

export const authRoutes = new Elysia().mount(auth.handler).macro({
	auth: {
		async resolve({ request: { headers } }) {
			const session = await auth.api.getSession({
				headers,
			});

			if (!session) throw new UnathorizedError();

			return {
				user: session.user,
				session: session.session,
			};
		},
	},
});
