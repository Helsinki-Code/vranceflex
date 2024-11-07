import { subscriptionTiers } from "@/data/subscriptionTiers"
import { db } from "@/drizzle/db"
import { UserSubscriptionTable } from "@/drizzle/schema"
import { CACHE_TAGS, dbCache, getUserTag, revalidateDbCache } from "@/lib/cache"
import { SQL, eq } from "drizzle-orm"

export async function getUserSubscription(userId: string) {
  try {
    return await db.query.UserSubscriptionTable.findFirst({
      where: eq(UserSubscriptionTable.clerkUserId, userId),
    })
  } catch (error) {
    console.error("Error getting user subscription:", error)
    return null
  }
}

export async function createDefaultSubscription(clerkUserId: string) {
  try {
    // First, try to get existing subscription
    const existingSubscription = await getUserSubscription(clerkUserId)
    if (existingSubscription) {
      return existingSubscription
    }

    // If no subscription exists, create one with ON CONFLICT DO NOTHING
    const [newSubscription] = await db
      .insert(UserSubscriptionTable)
      .values({
        clerkUserId,
        tier: "Free"
      })
      .onConflictDoNothing({ 
        target: UserSubscriptionTable.clerkUserId 
      })
      .returning()

    if (newSubscription) {
      return newSubscription
    }

    // If no new subscription was created (due to conflict), get the existing one
    return await getUserSubscription(clerkUserId)
  } catch (error) {
    console.error("Error in createDefaultSubscription:", error)
    // Final attempt to get existing subscription
    const finalAttempt = await getUserSubscription(clerkUserId)
    if (finalAttempt) {
      return finalAttempt
    }
    return null
  }
}

export async function getUserSubscriptionTier(userId: string) {
  try {
    let subscription = await getUserSubscription(userId)
    
    if (!subscription) {
      subscription = await createDefaultSubscription(userId)
    }

    // If we still don't have a subscription, return Free tier
    if (!subscription) {
      return subscriptionTiers.Free
    }

    return subscriptionTiers[subscription.tier]
  } catch (error) {
    console.error("Error in getUserSubscriptionTier:", error)
    return subscriptionTiers.Free // Fallback to Free tier
  }
}

export async function createUserSubscription(
  data: typeof UserSubscriptionTable.$inferInsert
) {
  try {
    const [subscription] = await db
      .insert(UserSubscriptionTable)
      .values({
        ...data,
        tier: data.tier || "Free"
      })
      .onConflictDoNothing({
        target: UserSubscriptionTable.clerkUserId
      })
      .returning()

    if (subscription) {
      revalidateDbCache({
        tag: CACHE_TAGS.subscription,
        id: subscription.id,
        userId: subscription.clerkUserId,
      })
      return subscription
    }

    // If no new subscription was created, get the existing one
    return await getUserSubscription(data.clerkUserId)
  } catch (error) {
    console.error("Error in createUserSubscription:", error)
    return await getUserSubscription(data.clerkUserId)
  }
}

export async function updateUserSubscription(
  where: SQL,
  data: Partial<typeof UserSubscriptionTable.$inferInsert>
) {
  try {
    const [updatedSubscription] = await db
      .update(UserSubscriptionTable)
      .set(data)
      .where(where)
      .returning()

    if (updatedSubscription) {
      revalidateDbCache({
        tag: CACHE_TAGS.subscription,
        userId: updatedSubscription.clerkUserId,
        id: updatedSubscription.id,
      })
    }

    return updatedSubscription
  } catch (error) {
    console.error("Error updating subscription:", error)
    throw error
  }
}

// Helper function to ensure a user has a subscription
export async function ensureUserSubscription(userId: string) {
  try {
    const subscription = await getUserSubscription(userId)
    if (subscription) {
      return subscription
    }
    
    return await createDefaultSubscription(userId)
  } catch (error) {
    console.error("Error ensuring user subscription:", error)
    return null
  }
}