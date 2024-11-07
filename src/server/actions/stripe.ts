"use server"

import { PaidTierNames } from "@/data/subscriptionTiers"
import { auth, currentUser } from "@clerk/nextjs/server"
import { getUserSubscription, updateUserSubscription } from "../db/subscription"
import { UserSubscriptionTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

const STRIPE_PAYMENT_LINKS = {
  Basic: 'https://buy.stripe.com/7sIbM27Jg5d9c92bIN',
  Standard: 'https://buy.stripe.com/28o7vM9Roaxt6OI148',
  Premium: 'https://buy.stripe.com/6oEeYe3t0fRN2ys147'
} as const

export async function createCheckoutSession(tier: PaidTierNames): Promise<{ url: string | null; error?: string }> {
  try {
    const user = await currentUser()
    if (!user) {
      return { url: null, error: "User not found" }
    }

    const paymentLink = STRIPE_PAYMENT_LINKS[tier]
    if (!paymentLink) {
      return { url: null, error: "Invalid subscription tier" }
    }

    // Update the subscription tier immediately
    await updateUserSubscription(
      eq(UserSubscriptionTable.clerkUserId, user.id),
      { tier }
    )

    // Revalidate the subscription page to show new tier
    revalidatePath('/dashboard/subscription')

    // Add client reference ID to the URL for tracking
    const urlWithRef = `${paymentLink}?client_reference_id=${user.id}`
    return { url: urlWithRef }
  } catch (error) {
    console.error("Checkout session error:", error)
    return { url: null, error: "Failed to create checkout session" }
  }
}

export async function createCustomerPortalSession(): Promise<{ url: string | null; error?: string }> {
  try {
    const { userId } = auth()
    if (!userId) {
      return { url: null, error: "Not authenticated" }
    }

    const subscription = await getUserSubscription(userId)
    if (!subscription?.stripeCustomerId) {
      return { url: null, error: "No subscription found" }
    }

    // Track portal access attempt
    console.log(`User ${userId} accessed customer portal`)

    // For customer portal, redirect to Stripe's test portal
    return { url: `https://billing.stripe.com/p/login/cN25ly9oyaq1eKkdQQ` }
  } catch (error) {
    console.error("Customer portal error:", error)
    return { url: null, error: "Failed to access customer portal" }
  }
}

export async function createCancelSession(): Promise<{ url: string | null; error?: string }> {
  try {
    const user = await currentUser()
    if (!user) {
      return { url: null, error: "Not authenticated" }
    }

    // Update subscription to Free tier immediately
    await updateUserSubscription(
      eq(UserSubscriptionTable.clerkUserId, user.id),
      { 
        tier: 'Free',
        stripeSubscriptionId: null,
        stripeSubscriptionItemId: null,
        stripeCustomerId: null
      }
    )

    // Revalidate the subscription page
    revalidatePath('/dashboard/subscription')

    // Log cancellation attempt
    console.log(`User ${user.id} cancelled subscription`)

    // Direct link to customer portal for cancellation
    return { url: `https://billing.stripe.com/p/login/cN25ly9oyaq1eKkdQQ` }
  } catch (error) {
    console.error("Cancel session error:", error)
    return { url: null, error: "Failed to access cancellation page" }
  }
}
