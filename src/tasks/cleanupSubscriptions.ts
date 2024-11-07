import { db } from "@/drizzle/db"
import { sql } from "drizzle-orm"
import { UserSubscriptionTable } from "@/drizzle/schema"

async function cleanupSubscriptions() {
  try {
    console.log('Starting subscription cleanup...')

    // Find duplicate subscriptions
    console.log('\nChecking for duplicate subscriptions...')
    const duplicates = await db.execute(sql`
      SELECT clerk_user_id, COUNT(*) as count
      FROM user_subscriptions 
      GROUP BY clerk_user_id 
      HAVING COUNT(*) > 1
    `)

    if (duplicates.rows.length > 0) {
      console.log('Found duplicate subscriptions for users:', duplicates.rows)

      // Delete duplicates keeping the oldest one
      const deleteResult = await db.execute(sql`
        DELETE FROM user_subscriptions 
        WHERE id IN (
          SELECT id 
          FROM (
            SELECT id,
                   ROW_NUMBER() OVER (
                    PARTITION BY clerk_user_id 
                    ORDER BY created_at
                   ) as rnum 
            FROM user_subscriptions
          ) t 
          WHERE t.rnum > 1
        )
        RETURNING id, clerk_user_id
      `)

      console.log('Deleted duplicate subscriptions:', deleteResult.rows)
    } else {
      console.log('No duplicate subscriptions found.')
    }

    // Ensure all users have a subscription
    console.log('\nChecking for users without subscriptions...')
    const insertResult = await db.execute(sql`
      INSERT INTO user_subscriptions (clerk_user_id, tier)
      SELECT DISTINCT p.clerk_user_id, 'Free'::tier
      FROM products p
      WHERE NOT EXISTS (
        SELECT 1 
        FROM user_subscriptions us 
        WHERE us.clerk_user_id = p.clerk_user_id
      )
      RETURNING id, clerk_user_id
    `)

    if (insertResult.rows.length > 0) {
      console.log('Created free subscriptions for users:', insertResult.rows)
    } else {
      console.log('All users have subscriptions.')
    }

    // Validate final state
    console.log('\nValidating final state...')
    const validation = await db.execute(sql`
      SELECT 
        COUNT(DISTINCT p.clerk_user_id) as total_users,
        COUNT(DISTINCT us.clerk_user_id) as users_with_subscriptions,
        COUNT(us.id) as total_subscriptions
      FROM products p
      LEFT JOIN user_subscriptions us ON us.clerk_user_id = p.clerk_user_id
    `)

    console.log('Validation results:', validation.rows[0])

    console.log('\nCleanup completed successfully!')
  } catch (error) {
    console.error('Error during cleanup:', error)
    process.exit(1)
  }
}

// Run the cleanup
cleanupSubscriptions()
