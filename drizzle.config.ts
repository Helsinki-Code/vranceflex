import { env } from "@/data/env/server"
import { defineConfig } from "drizzle-kit"
import type { Config } from "drizzle-kit"

if (!env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined")
}

// Parse the DATABASE_URL
const dbUrl = new URL(env.DATABASE_URL)

const config: Config = {
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: {
    host: dbUrl.hostname,
    port: parseInt(dbUrl.port) || 5432,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1), // Remove leading slash
    ssl: dbUrl.searchParams.get("sslmode") === "require",
  }
}

export default defineConfig(config)