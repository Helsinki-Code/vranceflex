"use client"

import { Button } from "@/components/ui/button"
import { SignUpButton } from "@clerk/nextjs"
import { CheckIcon } from "lucide-react"
import { subscriptionTiersInOrder } from "@/data/subscriptionTiers"
import { formatCompactNumber } from "@/lib/formatters"

export function PricingSection() {
  return (
    <section className="px-4 py-24 relative overflow-hidden" id="pricing">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" />
      <div className="absolute w-[500px] h-[500px] -top-32 -right-32 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute w-[500px] h-[500px] -bottom-32 -left-32 bg-blue-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
            Pricing That Scales With Your Success
          </h2>
          <p className="text-xl text-gray-400">
            Choose the perfect plan for your business. All plans include our core features with flexible pricing options.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {subscriptionTiersInOrder.map((tier, index) => (
            <PricingCard 
              key={tier.name}
              {...tier}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-24 animate-fade-in delay-500">
          <h3 className="text-2xl font-bold mb-8 text-center">All Plans Include</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureList
              title="Core Features"
              features={[
                "Automatic PPP Detection",
                "Smart Price Adjustments",
                "Real-time Currency Conversion",
                "Regional Price Optimization",
                "Basic Analytics Dashboard"
              ]}
            />
            <FeatureList
              title="Security"
              features={[
                "SSL Encryption",
                "Data Privacy Controls",
                "GDPR Compliance",
                "Regular Backups",
                "99.9% Uptime SLA"
              ]}
            />
            <FeatureList
              title="Support"
              features={[
                "24/7 Email Support",
                "Comprehensive Documentation",
                "API Access",
                "Community Forum",
                "Regular Updates"
              ]}
            />
          </div>
        </div>
      </div>
    </section>
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
  delay,
}: typeof subscriptionTiersInOrder[number] & { delay: number }) {
  const isMostPopular = name === "Standard"

  return (
    <div 
      className={`animate-fade-in-up delay-${delay} group relative rounded-2xl p-px overflow-hidden
                  transition-all duration-500 hover:scale-105`}
    >
      {/* Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Card Content */}
      <div className={`relative h-full rounded-2xl p-8 
                      ${isMostPopular ? 'bg-blue-900/40' : 'bg-gray-900/40'} 
                      backdrop-blur-xl`}>
        {isMostPopular && (
          <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-blue-500 to-blue-400 px-12 py-1 text-sm text-white">
            Most Popular
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-100 mb-4">{name}</h3>
          <div className="flex items-baseline">
            <span className="text-5xl font-bold">${priceInCents / 100}</span>
            <span className="ml-2 text-gray-400">/month</span>
          </div>
          <p className="mt-4 text-gray-400">
            {formatCompactNumber(maxNumberOfVisits)} pricing page visits/mo
          </p>
        </div>

        {/* CTA Button */}
        <SignUpButton>
          <Button 
            className={`w-full py-6 text-lg rounded-xl transition-all duration-300
                     ${isMostPopular 
                       ? 'bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white' 
                       : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            Get Started
          </Button>
        </SignUpButton>

        {/* Features List */}
        <ul className="mt-8 space-y-4 text-gray-300">
          <PricingFeature active>{maxNumberOfProducts} products</PricingFeature>
          <PricingFeature active>PPP discounts</PricingFeature>
          <PricingFeature active={canAccessAnalytics}>Advanced analytics</PricingFeature>
          <PricingFeature active={canRemoveBranding}>Remove branding</PricingFeature>
          <PricingFeature active={canCustomizeBanner}>Banner customization</PricingFeature>
        </ul>
      </div>
    </div>
  )
}

function PricingFeature({ children, active = true }: { children: React.ReactNode; active?: boolean }) {
  return (
    <li className={`flex items-center gap-3 ${!active && 'text-gray-500'}`}>
      <CheckIcon className={`w-5 h-5 ${active ? 'text-blue-400' : 'text-gray-600'}`} />
      <span>{children}</span>
    </li>
  )
}

function FeatureList({ title, features }: { title: string; features: string[] }) {
  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 backdrop-blur-xl">
      <h4 className="text-xl font-semibold mb-4 text-gray-100">{title}</h4>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3 text-gray-300">
            <CheckIcon className="w-5 h-5 text-blue-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}