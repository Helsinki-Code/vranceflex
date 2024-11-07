import { db } from "@/drizzle/db"
import { sql } from "drizzle-orm"

async function validateSubscriptions() {
  try {
    console.log('Starting subscription validation...')

    // Check for users without subscriptions
    const usersWithoutSubs = await db.execute(sql`
      SELECT p.clerk_user_id, p.name as product_name
      FROM products p
      LEFT JOIN user_subscriptions us ON us.clerk_user_id = p.clerk_user_id
      WHERE us.id IS NULL
    `)

    if (usersWithoutSubs.rows.length > 0) {
      console.warn('Users without subscriptions:', usersWithoutSubs.rows)
    } else {
      console.log('All users have subscriptions.')
    }

    // Check for multiple subscriptions
    const multipleSubscriptions = await db.execute(sql`
      SELECT clerk_user_id, COUNT(*) as subscription_count
      FROM user_subscriptions
      GROUP BY clerk_user_id
      HAVING COUNT(*) > 1
    `)

    if (multipleSubscriptions.rows.length > 0) {
      console.warn('Users with multiple subscriptions:', multipleSubscriptions.rows)
    } else {
      console.log('No duplicate subscriptions found.')
    }

    // Check for invalid tier values
    const invalidTiers = await db.execute(sql`
      SELECT clerk_user_id, tier
      FROM user_subscriptions
      WHERE tier NOT IN ('Free', 'Basic', 'Standard', 'Premium')
    `)

    if (invalidTiers.rows.length > 0) {
      console.warn('Subscriptions with invalid tiers:', invalidTiers.rows)
    } else {
      console.log('All tier values are valid.')
    }

    console.log('\nValidation completed!')
  } catch (error) {
    console.error('Error during validation:', error)
    process.exit(1)
  }
}

validateSubscriptions()