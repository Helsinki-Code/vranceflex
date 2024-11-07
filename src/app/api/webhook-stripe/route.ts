import { env } from "@/data/env/server"
import { getTierByPriceId, subscriptionTiers } from "@/data/subscriptionTiers"
import { UserSubscriptionTable } from "@/drizzle/schema"
import { updateUserSubscription } from "@/server/db/subscription"
import { eq } from "drizzle-orm"
import Stripe from "stripe"
import { NextResponse } from "next/server"

// Types
type StripeSubscription = Stripe.Subscription
interface SubscriptionUpdateData {
  stripeCustomerId?: string
  tier?: string
  stripeSubscriptionId?: string | null
  stripeSubscriptionItemId?: string | null
}

// Validate required environment variables
if (!env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined")
}

if (!env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("STRIPE_WEBHOOK_SECRET is not defined")
}

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16"
})

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const signature = request.headers.get("stripe-signature")
    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      )
    }

    const event = await stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      env.STRIPE_WEBHOOK_SECRET
    )

    switch (event.type) {
      case "customer.subscription.deleted": {
        await handleDelete(event.data.object as StripeSubscription)
        break
      }
      case "customer.subscription.updated": {
        await handleUpdate(event.data.object as StripeSubscription)
        break
      }
      case "customer.subscription.created": {
        await handleCreate(event.data.object as StripeSubscription)
        break
      }
      default: {
        console.log(`Unhandled event type: ${event.type}`)
      }
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    return handleError(error)
  }
}

async function handleCreate(subscription: StripeSubscription): Promise<void> {
  try {
    const priceId = subscription.items.data[0]?.price?.id
    if (!priceId) {
      throw new Error("No price ID found in subscription")
    }

    const tier = getTierByPriceId(priceId)
    const clerkUserId = subscription.metadata?.clerkUserId
    
    if (!clerkUserId || !tier) {
      throw new Error("Missing required subscription data")
    }
    
    const customer = subscription.customer
    const customerId = typeof customer === "string" ? customer : customer.id

    await updateUserSubscription(
      eq(UserSubscriptionTable.clerkUserId, clerkUserId),
      {
        stripeCustomerId: customerId,
        tier: tier.name,
        stripeSubscriptionId: subscription.id,
        stripeSubscriptionItemId: subscription.items.data[0].id,
      }
    )
  } catch (error) {
    console.error('Error handling subscription creation:', error)
    throw error
  }
}

async function handleUpdate(subscription: StripeSubscription): Promise<void> {
  try {
    const priceId = subscription.items.data[0]?.price?.id
    if (!priceId) {
      throw new Error("No price ID found in subscription")
    }

    const tier = getTierByPriceId(priceId)
    if (!tier) {
      throw new Error("Invalid tier for price ID")
    }

    const customer = subscription.customer
    const customerId = typeof customer === "string" ? customer : customer.id

    await updateUserSubscription(
      eq(UserSubscriptionTable.stripeCustomerId, customerId),
      { tier: tier.name }
    )
  } catch (error) {
    console.error('Error handling subscription update:', error)
    throw error
  }
}

async function handleDelete(subscription: StripeSubscription): Promise<void> {
  try {
    const customer = subscription.customer
    const customerId = typeof customer === "string" ? customer : customer.id

    await updateUserSubscription(
      eq(UserSubscriptionTable.stripeCustomerId, customerId),
      {
        tier: subscriptionTiers.Free.name,
        stripeSubscriptionId: null,
        stripeSubscriptionItemId: null,
      }
    )
  } catch (error) {
    console.error('Error handling subscription deletion:', error)
    throw error
  }
}

function handleError(error: unknown): NextResponse {
  console.error('Error processing webhook:', error)
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
}
