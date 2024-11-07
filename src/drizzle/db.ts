import { env } from "@/data/env/server"
import { neon, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

if (!env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not defined. Please set this environment variable."
  )
}

// Configure Neon
neonConfig.fetchConnectionCache = true

const sql = neon(env.DATABASE_URL as string)

export const db = drizzle(sql, {
  schema,
  logger: process.env.NODE_ENV === "development",
})
