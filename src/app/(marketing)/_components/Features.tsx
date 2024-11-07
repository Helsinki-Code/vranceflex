"use client"

import { Button } from "@/components/ui/button"
import { 
  Globe, 
  BarChart3, 
  Shield, 
  Zap,
  RefreshCcw,
  DatabaseZap,
  Users,
  ScrollText,
  Settings,
  AlertCircle,
  LineChart,
  Lock
} from "lucide-react"
import { useState } from "react"

type Feature = {
  icon: typeof Globe;
  title: string;
  description: string;
}

const features = {
  "Global Pricing": [
    {
      icon: Globe,
      title: "Location-Based Pricing",
      description: "Automatically adjust prices based on local purchasing power parity (PPP) and market conditions."
    },
    {
      icon: BarChart3,
      title: "Dynamic Adjustments",
      description: "Real-time price optimization based on market demand and competitor analysis."
    },
    {
      icon: Shield,
      title: "Fraud Prevention",
      description: "Advanced IP and payment verification to prevent pricing manipulation."
    },
    {
      icon: Zap,
      title: "Instant Updates",
      description: "Changes reflect immediately across all platforms and regions."
    }
  ],
  "Analytics & Insights": [
    {
      icon: LineChart,
      title: "Performance Tracking",
      description: "Comprehensive analytics dashboard with conversion rates and revenue metrics."
    },
    {
      icon: Users,
      title: "Customer Segmentation",
      description: "Understand user behavior across different regions and price points."
    },
    {
      icon: AlertCircle,
      title: "Anomaly Detection",
      description: "AI-powered system flags unusual patterns and potential issues."
    },
    {
      icon: ScrollText,
      title: "Custom Reports",
      description: "Generate detailed reports on pricing performance and market trends."
    }
  ],
  "Technical Features": [
    {
      icon: RefreshCcw,
      title: "Seamless Integration",
      description: "Easy integration with major e-commerce platforms and payment systems."
    },
    {
      icon: DatabaseZap,
      title: "Real-time Data",
      description: "Live updates and synchronization across all your platforms."
    },
    {
      icon: Settings,
      title: "Customizable Rules",
      description: "Set specific pricing rules and conditions for different markets."
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-level encryption and security for all transactions."
    }
  ]
}

export function Features() {
  const [activeTab, setActiveTab] = useState("Global Pricing")
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  return (
    <section className="py-32 relative">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
              Global Success
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to optimize pricing across global markets and maximize revenue.
          </p>
        </div>

        {/* Feature Navigation */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          {Object.keys(features).map((category) => (
            <Button
              key={category}
              variant={activeTab === category ? "default" : "outline"}
              className={`text-lg px-6 py-6 ${
                activeTab === category 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-400' 
                  : 'border-blue-500/20 hover:bg-blue-500/10'
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features[activeTab as keyof typeof features].map((feature, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredFeature(feature.title)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 
                ${hoveredFeature === feature.title ? 'opacity-20' : ''} 
                transition-opacity duration-300`}
              />
              <div className={`relative p-8 rounded-lg border h-full transition-all duration-300
                bg-gray-900/50 border-gray-800`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <feature.icon className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Demo */}
        <div className="mt-20 p-8 rounded-2xl border border-gray-800 bg-gray-900/50">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold">See It In Action</h3>
              <p className="text-gray-400">
                Watch how VranceFlex automatically optimizes your pricing across different regions.
                Our platform handles everything from detection to conversion.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-400"
              >
                Watch Demo
              </Button>
            </div>
            <div className="relative">
              {/* Live Demo Visualization */}
              <div className="aspect-video rounded-lg bg-gray-800 overflow-hidden">
                <div className="p-4 h-full flex items-center justify-center text-gray-400">
                  Interactive Demo Visualization
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}