"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Book, Code2, FileText, Laptop, Play, Terminal } from "lucide-react"

export function Resources() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Resources &{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
              Documentation
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to get started and make the most of VranceFlex.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Book,
              title: "Documentation",
              description: "Comprehensive guides and API references",
              link: "View Docs"
            },
            {
              icon: Play,
              title: "Video Tutorials",
              description: "Step-by-step implementation guides",
              link: "Watch Now"
            },
            {
              icon: Terminal,
              title: "Developer Tools",
              description: "SDKs, plugins, and sample code",
              link: "Explore Tools"
            }
          ].map((resource, index) => (
            <div 
              key={index}
              className="group relative"
            >
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" />
              <div className="relative p-8 rounded-lg bg-gray-900/50 border border-gray-800">
                <div className="p-3 rounded-lg bg-blue-500/10 w-fit mb-6">
                  <resource.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">{resource.title}</h3>
                <p className="text-gray-400 mb-6">{resource.description}</p>
                <Button 
                  variant="link" 
                  className="text-blue-400 hover:text-blue-300 p-0"
                >
                  {resource.link}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Resources */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Getting Started Guide */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Laptop className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Getting Started</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Follow our step-by-step guide to implement VranceFlex in your application.
              </p>
              <div className="space-y-4">
                {[
                  "Installation & Setup",
                  "Basic Configuration",
                  "Price Optimization Rules",
                  "Testing & Deployment"
                ].map((step, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-medium">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-800 p-4">
              <Button 
                variant="link" 
                className="text-blue-400 hover:text-blue-300"
              >
                View Full Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* API Reference */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Code2 className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">API Reference</h3>
              </div>
              <div className="space-y-6">
                <div className="rounded-lg bg-gray-950 p-4 font-mono text-sm">
                  <pre className="text-gray-300">
{`// Initialize VranceFlex
const client = new VranceFlex({
  apiKey: 'your_api_key',
  region: 'global'
});

// Get optimized price
const price = await client.getPrice({
  productId: 'prod_123',
  basePrice: 99.99
});`}
                  </pre>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Authentication</span>
                    <ArrowRight className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Price Optimization</span>
                    <ArrowRight className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Analytics</span>
                    <ArrowRight className="h-4 w-4 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 p-4">
              <Button 
                variant="link" 
                className="text-blue-400 hover:text-blue-300"
              >
                View Full API Reference
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
          <p className="text-gray-400 mb-8">
            Our support team is available 24/7 to help you with any questions.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-400"
            >
              Contact Support
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-blue-500/20 hover:bg-blue-500/10"
            >
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}