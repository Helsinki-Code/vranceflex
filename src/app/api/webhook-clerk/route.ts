import { headers } from "next/headers"
import { env } from "@/data/env/server"
import {
  ensureUserSubscription,
  getUserSubscription,
} from "@/server/db/subscription"
import { deleteUser } from "@/server/db/users"
import { Stripe } from "stripe"
import { Webhook } from "svix"
import { WebhookEvent } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Type for webhook response
type WebhookResponse = Response | NextResponse

// Check for required environment variables
if (!env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined")
}

if (!env.CLERK_WEBHOOK_SECRET) {
  throw new Error("CLERK_WEBHOOK_SECRET is not defined")
}

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16" // Specify the latest Stripe API version
})

export async function POST(req: Request): Promise<WebhookResponse> {
  try {
    const headerPayload = headers()
    const svixId = headerPayload.get("svix-id")
    const svixTimestamp = headerPayload.get("svix-timestamp")
    const svixSignature = headerPayload.get("svix-signature")

    if (!svixId || !svixTimestamp || !svixSignature) {
      return new Response("Missing svix headers", { status: 400 })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(env.CLERK_WEBHOOK_SECRET)
    const event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent

    switch (event.type) {
      case "user.created": {
        if (event.data?.id) {
          await ensureUserSubscription(event.data.id)
        }
        break
      }
      case "user.deleted": {
        if (event.data?.id) {
          const userSubscription = await getUserSubscription(event.data.id)
          if (userSubscription?.stripeSubscriptionId) {
            await stripe.subscriptions.cancel(
              userSubscription.stripeSubscriptionId
            )
          }
          await deleteUser(event.data.id)
        }
        break
      }
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Webhook error:", error)
    return handleError(error)
  }
}

// Error handling utility
function handleError(error: unknown): WebhookResponse {
  console.error("Webhook processing error:", error)
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
}
