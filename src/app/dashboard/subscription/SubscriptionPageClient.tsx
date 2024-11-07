"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { subscriptionTiers, subscriptionTiersInOrder } from "@/data/subscriptionTiers"
import { formatCompactNumber } from "@/lib/formatters"
import {
  createCancelSession,
  createCheckoutSession,
  createCustomerPortalSession,
} from "@/server/actions/stripe"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface SubscriptionPageClientProps {
  currentTier: string
  productCount: number
  viewCount: number
}

interface PricingCardProps {
  name: string
  priceInCents: number
  maxNumberOfVisits: number
  maxNumberOfProducts: number
  canRemoveBranding: boolean
  canAccessAnalytics: boolean
  canCustomizeBanner: boolean
  currentTier: string
  isLoading: boolean
  onSwap: () => void
}

interface FeatureProps {
  children: React.ReactNode
  active?: boolean
}

export function SubscriptionPageClient({ 
  currentTier, 
  productCount, 
  viewCount 
}: SubscriptionPageClientProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubscriptionChange = async (tier: string) => {
    try {
      setIsLoading(tier)
      
      let result: { error?: string; url?: string };
      if (tier === 'Free') {
        result = await createCancelSession()
      } else {
        result = await createCheckoutSession(tier)
      }

      if (result.error) {
        throw new Error(result.error)
      }

      if (result.url) {
        // Open payment page in new tab
        if (typeof window !== 'undefined') {
          window.open(result.url, '_blank')
        }
        
        // Refresh the current page
        router.refresh()

        toast({
          title: "Success",
          description: tier === 'Free' 
            ? "Subscription cancelled successfully" 
            : "Please complete payment in the new tab",
          variant: "default"
        })
      } else {
        throw new Error("No payment URL received")
      }
    } catch (error) {
      console.error('Subscription change error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to change subscription",
        variant: "destructive"
      })
    } finally {
      setIsLoading(null)
    }
  }

  const handleManageSubscription = async () => {
    try {
      setIsLoading('manage')
      const result = await createCustomerPortalSession()
      
      if (result.error) {
        throw new Error(result.error)
      }

      if (result.url && typeof window !== 'undefined') {
        // Open portal in new tab
        window.open(result.url, '_blank')
        
        toast({
          title: "Success",
          description: "Customer portal opened in new tab",
          variant: "default"
        })
      } else {
        throw new Error("No portal URL received")
      }
    } catch (error) {
      console.error('Portal access error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to access customer portal",
        variant: "destructive"
      })
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">Your Subscription</h1>
      <div className="flex flex-col gap-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Usage</CardTitle>
              <CardDescription>
                {formatCompactNumber(viewCount)} /{" "}
                {formatCompactNumber(subscriptionTiers[currentTier].maxNumberOfVisits)} pricing page visits this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress
                value={(viewCount / subscriptionTiers[currentTier].maxNumberOfVisits) * 100}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Number of Products</CardTitle>
              <CardDescription>
                {productCount} / {subscriptionTiers[currentTier].maxNumberOfProducts} products created
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress
                value={(productCount / subscriptionTiers[currentTier].maxNumberOfProducts) * 100}
              />
            </CardContent>
          </Card>
        </div>

        {currentTier !== 'Free' && (
          <Card>
            <CardHeader>
              <CardTitle>You are currently on the {currentTier} plan</CardTitle>
              <CardDescription>
                Manage your subscription or payment method using the button below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="accent"
                className="text-lg rounded-lg"
                size="lg"
                onClick={handleManageSubscription}
                disabled={isLoading === 'manage'}
              >
                {isLoading === 'manage' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Manage Subscription"
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {subscriptionTiersInOrder.map((tier) => (
          <PricingCard
            key={tier.name}
            {...tier}
            currentTier={currentTier}
            isLoading={isLoading === tier.name}
            onSwap={() => handleSubscriptionChange(tier.name)}
          />
        ))}
      </div>
    </>
  )
}

function PricingCard({
  name,
  priceInCents,
  maxNumberOfVisits,
  maxNumberOfProducts,
  canRemoveBranding,
  canAccessAnalytics,
  canCustomizeBanner,
  currentTier,
  isLoading,
  onSwap,
}: PricingCardProps) {
  const isCurrent = currentTier === name

  return (
    <Card className={cn(
      "relative overflow-hidden rounded-xl",
      isCurrent && "border-accent border-2"
    )}>
      {isCurrent && (
        <div className="absolute -right-8 top-6 rotate-45 bg-accent text-accent-foreground py-1 px-10">
          Current
        </div>
      )}
      
      <CardHeader>
        <div className="text-accent font-semibold mb-8">{name}</div>
        <CardTitle className="text-xl font-bold">
          ${priceInCents / 100} /mo
        </CardTitle>
        <CardDescription>
          {formatCompactNumber(maxNumberOfVisits)} pricing page visits/mo
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Button
          onClick={onSwap}
          disabled={isCurrent || isLoading}
          className="w-full text-lg"
          variant={isCurrent ? "outline" : "default"}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : isCurrent ? (
            "Current Plan"
          ) : name === "Free" ? (
            "Downgrade"
          ) : (
            "Upgrade"
          )}
        </Button>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 items-start">
        <Feature active>{maxNumberOfProducts} products</Feature>
        <Feature active>PPP discounts</Feature>
        <Feature active={canAccessAnalytics}>Advanced analytics</Feature>
        <Feature active={canRemoveBranding}>Remove branding</Feature>
        <Feature active={canCustomizeBanner}>Banner customization</Feature>
      </CardFooter>
    </Card>
  )
}

function Feature({ children, active = true }: FeatureProps) {
  return (
    <div className={cn("flex items-center gap-2", !active && "opacity-50")}>
      <CheckIcon className="h-4 w-4 text-accent" />
      <span>{children}</span>
    </div>
  )
}
