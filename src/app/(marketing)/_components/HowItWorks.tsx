"use client"

import { Globe2, LineChart, Settings2, Zap } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Simple Process,{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
              Powerful Results
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Get started with VranceFlex in minutes. Our platform automatically handles 
            all the complexity of global pricing optimization.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Globe2,
              title: "Location Detection",
              description: "Automatically detect visitor's location and apply the appropriate pricing based on local purchasing power.",
              step: "01"
            },
            {
              icon: Settings2,
              title: "Price Optimization",
              description: "Our AI analyzes market data and optimizes prices for maximum conversion in each region.",
              step: "02"
            },
            {
              icon: LineChart,
              title: "Performance Tracking",
              description: "Monitor performance with real-time analytics and insights across all markets.",
              step: "03"
            },
            {
              icon: Zap,
              title: "Instant Results",
              description: "See immediate improvements in conversion rates and revenue across global markets.",
              step: "04"
            }
          ].map((item, index) => (
            <ProcessStep key={index} {...item} />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-20 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h3 className="text-3xl font-bold">Advanced Features</h3>
            <div className="space-y-6">
              {[
                "Automatic currency conversion",
                "Custom pricing rules",
                "A/B testing capabilities",
                "Advanced fraud prevention",
                "Integration with major platforms"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pl-16 space-y-8">
            <h3 className="text-3xl font-bold">Integration Process</h3>
            <div className="prose prose-invert">
              <pre className="rounded-lg bg-gray-900 p-4 font-mono text-sm">
                <code>{`<script src="https://vranceflex.com/api/v1/price-optimize.js"></script>

<!-- Add to your pricing section -->
<div data-vranceflex-price="basic-plan">
  $99/month
</div>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessStep({ icon: Icon, title, description, step }: {
  icon: any
  title: string
  description: string
  step: string
}) {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" />
      <div className="relative p-8 rounded-lg bg-gray-900/50 border border-gray-800 h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-blue-500/10">
            <Icon className="h-6 w-6 text-blue-400" />
          </div>
          <div className="text-sm font-bold text-gray-400">STEP {step}</div>
        </div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  )
}