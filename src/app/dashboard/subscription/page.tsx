import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getUserSubscriptionTier } from "@/server/db/subscription"
import { getProductCount } from "@/server/db/products"
import { getProductViewCount } from "@/server/db/productViews"
import { startOfMonth } from "date-fns"
import { SubscriptionPageClient } from "./SubscriptionPageClient"

export default async function SubscriptionPage() {
  const { userId } = auth()
  if (!userId) redirect("/sign-in")

  const [tier, productCount, viewCount] = await Promise.all([
    getUserSubscriptionTier(userId),
    getProductCount(userId),
    getProductViewCount(userId, startOfMonth(new Date()))
  ])

  return (
    <SubscriptionPageClient
      currentTier={tier.name}
      productCount={productCount}
      viewCount={viewCount}
    />
  )
}
