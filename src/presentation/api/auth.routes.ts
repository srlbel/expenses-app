import { auth } from "@/infrastructure/auth/auth";
import Elysia from "elysia";

export const authRoutes = new Elysia().mount(auth.handler);
