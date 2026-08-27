import { drizzle } from "drizzle-orm/bun-sqlite";
import { CONFIG } from "@/config";
import { Database } from "bun:sqlite";
import * as schema from "@/infrastructure/drizzle/schema/expense";

const sqlite = new Database(CONFIG.database_file);
export const db = drizzle({ client: sqlite, schema });
