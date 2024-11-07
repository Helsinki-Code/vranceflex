"use client"

import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Clock, 
  Globe2,  // Changed from Globe to Globe2
  DollarSign,
  Laptop,
  Terminal 
} from "lucide-react"

export function Benefits() {
  return (
    <section className="py-32 relative bg-gradient-to-b from-gray-900 to-background">
      <div className="container mx-auto max-w-7xl px-4">
        {/* ROI Calculator */}
        <div className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Calculate Your{' '}
              <span className="bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
                Potential ROI
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              See how much additional revenue you could generate with optimized global pricing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    Current Monthly Revenue
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-800 
                             focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="Enter your current revenue"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    Number of Countries
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-800 
                             focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="Enter number of target countries"
                  />
                </div>
              </div>

              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400"
              >
                Calculate Potential Revenue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl" />
              <div className="relative rounded-2xl border border-blue-500/20 bg-gray-900/50 p-8">
                <h4 className="text-xl font-bold mb-6">Projected Results</h4>
                <div className="space-y-6">
                  {[
                    { label: "Revenue Increase", value: "+85%", icon: TrendingUp },
                    { label: "New Markets", value: "50+", icon: Globe2 },  // Changed to Globe2
                    { label: "Customer Growth", value: "+120%", icon: Users },
                    { label: "Time to Value", value: "48 hours", icon: Clock }
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <stat.icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Success{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
              Stories
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            See how companies are transforming their global pricing strategy with VranceFlex.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              company: "TechStart SaaS",
              metric: "+92%",
              result: "Revenue Growth",
              description: "Expanded to 30 new markets with optimized pricing"
            },
            {
              company: "Global Learn",
              metric: "2.5x",
              result: "Conversion Rate",
              description: "Increased course sales with regional pricing"
            },
            {
              company: "E-Shop Plus",
              metric: "+145%",
              result: "Customer Base",
              description: "Attracted customers from emerging markets"
            }
          ].map((story, index) => (
            <div 
              key={index}
              className="relative group cursor-pointer"
            >
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" />
              <div className="relative p-8 rounded-lg bg-gray-900/50 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-bold">{story.company}</div>
                  <div className="text-sm text-gray-400">Case Study</div>
                </div>
                <div className="text-4xl font-bold mb-2">{story.metric}</div>
                <div className="text-blue-400 font-medium mb-4">{story.result}</div>
                <p className="text-gray-400">{story.description}</p>
                <Button 
                  variant="link" 
                  className="text-blue-400 hover:text-blue-300 p-0 mt-4"
                >
                  Read full story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
