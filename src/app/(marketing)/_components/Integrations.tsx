"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Code2, Laptop, ScrollText, Shield, Zap } from "lucide-react"
import { useState } from "react"

const platforms = {
  "E-commerce": [
    { name: "Shopify", icon: "/images/shopify.svg" },
    { name: "WooCommerce", icon: "/images/woocommerce.svg" },
    { name: "Magento", icon: "/images/magento.svg" },
    { name: "BigCommerce", icon: "/images/bigcommerce.svg" }
  ],
  "Payment": [
    { name: "Stripe", icon: "/images/stripe.svg" },
    { name: "PayPal", icon: "/images/paypal.svg" },
    { name: "Square", icon: "/images/square.svg" },
    { name: "Adyen", icon: "/images/adyen.svg" }
  ],
  "CRM & Analytics": [
    { name: "Salesforce", icon: "/images/salesforce.svg" },
    { name: "HubSpot", icon: "/images/hubspot.svg" },
    { name: "Google Analytics", icon: "/images/google-analytics.svg" },
    { name: "Segment", icon: "/images/segment.svg" }
  ]
}

export function Integrations() {
  const [selectedTab, setSelectedTab] = useState("E-commerce")
  const [showCodeExample, setShowCodeExample] = useState(false)

  return (
    <section className="py-32 relative">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Seamless{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
              Integration
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Connect with your favorite platforms in minutes. No complex setup required.
          </p>
        </div>

        {/* Integration Features */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Zap,
              title: "Quick Setup",
              description: "Get started in minutes with our simple integration process"
            },
            {
              icon: Shield,
              title: "Secure & Reliable",
              description: "Enterprise-grade security with 99.9% uptime guarantee"
            },
            {
              icon: Code2,
              title: "Developer Friendly",
              description: "Comprehensive API documentation and SDKs"
            }
          ].map((feature, index) => (
            <div key={index} className="p-8 rounded-lg bg-gray-900/50 border border-gray-800">
              <div className="p-3 rounded-lg bg-blue-500/10 w-fit mb-6">
                <feature.icon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Platform Integrations */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 overflow-hidden">
          <div className="border-b border-gray-800">
            <div className="flex overflow-x-auto">
              {Object.keys(platforms).map((tab) => (
                <button
                  key={tab}
                  className={`px-8 py-4 text-lg font-medium whitespace-nowrap
                    ${selectedTab === tab 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-gray-400 hover:text-gray-300'}`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {platforms[selectedTab as keyof typeof platforms].map((platform, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700"
                >
                  <div className="w-8 h-8 bg-gray-700 rounded" />
                  <span className="font-medium">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Integration Process */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Integration Process</h3>
            <p className="text-gray-400">Three simple steps to get started</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Install SDK",
                description: "Add our SDK to your platform with a single line of code"
              },
              {
                step: "02",
                title: "Configure Settings",
                description: "Set your pricing rules and regional preferences"
              },
              {
                step: "03",
                title: "Go Live",
                description: "Start optimizing your global pricing immediately"
              }
            ].map((step, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative p-8 rounded-lg bg-gray-900/50 border border-gray-800">
                  <div className="text-sm font-bold text-gray-400 mb-4">STEP {step.step}</div>
                  <h4 className="text-xl font-bold mb-4">{step.title}</h4>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Example */}
        <div className="mt-20">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold">Simple Integration</h3>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className={`border-blue-500/20 ${showCodeExample ? '' : 'bg-blue-500/10'}`}
                onClick={() => setShowCodeExample(false)}
              >
                Script Tag
              </Button>
              <Button
                variant="outline"
                className={`border-blue-500/20 ${showCodeExample ? 'bg-blue-500/10' : ''}`}
                onClick={() => setShowCodeExample(true)}
              >
                API Example
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl" />
            <div className="relative rounded-lg bg-gray-900 p-6 font-mono text-sm">
              {!showCodeExample ? (
                <pre className="text-gray-300">
                  {`<!-- Add to your head tag -->
<script src="https://cdn.vranceflex.com/v1/price-optimize.js"></script>

<!-- Add to your pricing elements -->
<div data-vranceflex-price="product-id">
  $99.99
</div>`}
                </pre>
              ) : (
                <pre className="text-gray-300">
                  {`// Initialize VranceFlex
const vranceflex = new VranceFlex('YOUR_API_KEY');

// Get optimized price for a region
const price = await vranceflex.getPrice({
  productId: 'product-123',
  basePrice: 99.99,
  currency: 'USD'
});

console.log(price);
// { amount: 42.99, currency: 'USD', discount: 0.57 }`}
                </pre>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-400"
          >
            View Full Documentation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}