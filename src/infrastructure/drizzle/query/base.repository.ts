import { db } from "@/infrastructure/drizzle/db";

export abstract class BaseRepository {
	constructor(protected readonly database: typeof db = db) {}
}
