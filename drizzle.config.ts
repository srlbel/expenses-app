import { defineConfig } from "drizzle-kit";
import { CONFIG } from "./src/config";

export default defineConfig({
    out: "./drizzle",
    dialect: "sqlite",
    schema: "src/infraestructure/database/schema",
    dbCredentials: {
        url: CONFIG.database_file,
    }
})