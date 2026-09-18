import cors from "@elysia/cors";
import Elysia from "elysia";

export const corsHandler = new Elysia().use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		credentials: true,
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);
