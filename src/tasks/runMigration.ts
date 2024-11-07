import { db } from "@/drizzle/db"
import { sql } from "drizzle-orm"
import { env } from "@/data/env/server"

async function runMigration() {
  try {
    console.log('Starting migration: Adding default subscriptions...')

    await db.execute(sql`
      INSERT INTO "user_subscriptions" ("clerk_user_id", "tier")
      SELECT "id", 'Free' as "tier"
      FROM "users" u
      WHERE NOT EXISTS (
          SELECT 1 
          FROM "user_subscriptions" us 
          WHERE us."clerk_user_id" = u."id"
      );
    `)

    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

runMigration()