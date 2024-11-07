"use client"

import { NavBar } from "./_components/NavBar"
import { Hero } from "./_components/Hero"
import { Features } from "./_components/Features"
import { HowItWorks } from "./_components/HowItWorks"
import { Benefits } from "./_components/Benefits"
import { Integrations } from "./_components/Integrations"
import { Testimonials } from "./_components/Testimonials"
import { PricingSection } from "./_components/PricingSection"
import { Resources } from "./_components/Resources"
import { Footer } from "./_components/Footer"
import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Fixed NavBar */}
      <NavBar />

      <main className="flex-grow">
        {/* Background Effects */}
        <div className="fixed inset-0 -z-10">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
          
          {/* Animated gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[500px] h-[500px] -top-32 -left-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute w-[500px] h-[500px] -bottom-32 -right-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          </div>
          
          {/* Grain effect */}
          <div className="absolute inset-0 opacity-20" 
               style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")` 
               }} />
        </div>

        {/* Content Sections */}
        <div className="relative">
          {/* Hero Section with proper spacing from fixed NavBar */}
          <div className="pt-16 lg:pt-20"> {/* Matches NavBar height */}
            <Hero />
          </div>

          {/* Main Content Sections */}
          <HowItWorks />
          <Features />
          <Benefits />
          <Integrations />
          <Testimonials />
          <PricingSection />
          <Resources />
          <Footer />
        </div>
      </main>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-8 bottom-8 p-4 rounded-full bg-blue-500/10 border border-blue-500/20 
                   text-blue-400 transition-all duration-300 hover:bg-blue-500/20 z-50
                   ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </button>

      {/* Radial Gradient Canvas - Follows Mouse */}
      <MouseGradient />
    </div>
  )
}

// Mouse following gradient effect
function MouseGradient() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const gradient = document.getElementById('mouse-gradient')
      if (gradient) {
        const x = e.clientX
        const y = e.clientY
        gradient.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0,102,255,0.05), transparent 40%)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      id="mouse-gradient"
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{ opacity: 0.5 }}
    />
  )
}
