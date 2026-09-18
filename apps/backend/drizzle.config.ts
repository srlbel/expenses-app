import { defineConfig } from "drizzle-kit";
import { CONFIG } from "./src/config";

export default defineConfig({
	out: "./drizzle",
	dialect: "sqlite",
	schema: "src/infrastructure/drizzle/schema",
	dbCredentials: {
		url: CONFIG.database_file,
	},
});
