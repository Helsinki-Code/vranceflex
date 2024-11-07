"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { SignUpButton } from "@clerk/nextjs"
import Typed from "typed.js"
import { ArrowRight, Globe, Users, Zap } from "lucide-react"

export function Hero() {
  const typedRef = useRef(null)

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        'Maximize Revenue',
        'Optimize Pricing',
        'Boost Conversions',
        'Scale Globally'
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
    })

    return () => typed.destroy()
  }, [])

  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 pb-32 px-4">
      {/* Main Hero Content */}
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                #1 in Global Pricing Optimization
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
              The Smart Way to{' '}
              <span className="bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
                <span ref={typedRef}></span>
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
              Transform your global pricing strategy with AI-powered purchasing power parity adjustments.
              Reach more customers, increase conversions, and boost revenue across all markets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <SignUpButton>
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-7 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignUpButton>
              
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto text-lg px-8 py-7 border-blue-500/20 hover:bg-blue-500/10"
              >
                Schedule Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-8 pt-8 lg:pt-16 border-t border-gray-800">
              <Stat
                icon={Globe}
                value="50+"
                label="Countries Supported"
              />
              <Stat
                icon={Users}
                value="10K+"
                label="Active Users"
              />
              <Stat
                icon={Zap}
                value="85%"
                label="Revenue Increase"
              />
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative lg:block hidden">
            <div className="absolute inset-0 bg-blue-500/30 blur-3xl animate-pulse" />
            <div className="relative bg-gray-900 rounded-2xl border border-gray-800 p-8 backdrop-blur-sm">
              <PricingDemoVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-lg bg-blue-500/10 p-3">
        <Icon className="h-6 w-6 text-blue-400" />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-gray-400">{label}</div>
      </div>
    </div>
  )
}

function PricingDemoVisual() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <div className="text-lg font-semibold text-white">Location-based Pricing</div>
        <div className="text-sm text-gray-400">Live Demo</div>
      </div>
      
      {[
        { country: "United States", price: "$100.00", ppp: "100%" },
        { country: "India", price: "$40.00", ppp: "40%", highlight: true },
        { country: "Brazil", price: "$65.00", ppp: "65%" },
        { country: "Germany", price: "$90.00", ppp: "90%" }
      ].map((item, index) => (
        <div 
          key={index}
          className={`flex items-center justify-between p-4 rounded-lg ${
            item.highlight ? 'bg-blue-500/10 ring-1 ring-blue-500/20' : 'bg-gray-800/50'
          }`}
        >
          <div>
            <div className="font-medium text-white">{item.country}</div>
            <div className="text-sm text-gray-400">PPP Rate: {item.ppp}</div>
          </div>
          <div className="text-xl font-bold text-white">{item.price}</div>
        </div>
      ))}
    </div>
  )
}