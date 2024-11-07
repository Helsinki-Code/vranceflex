"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

const testimonials = [
  {
    author: "Sarah Johnson",
    role: "CEO",
    company: "TechStart SaaS",
    image: "/avatars/sarah.jpg",
    content: "VranceFlex transformed our global pricing strategy. We've seen a 92% increase in revenue from international markets since implementing their solution.",
    rating: 5
  },
  {
    author: "Michael Chen",
    role: "Product Manager",
    company: "Global Learn",
    image: "/avatars/michael.jpg",
    content: "The ease of integration and immediate results were impressive. Our conversion rates doubled in emerging markets within the first month.",
    rating: 5
  },
  {
    author: "Emma Rodriguez",
    role: "Director of Sales",
    company: "E-Shop Plus",
    image: "/avatars/emma.jpg",
    content: "Finally, a solution that truly understands global market dynamics. The AI-powered pricing optimization has been a game-changer for our business.",
    rating: 5
  }
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" />
      
      <div className="container mx-auto max-w-7xl px-4 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
              Industry Leaders
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            See what our customers are saying about their experience with VranceFlex.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-500/5 blur-3xl" />
          
          <div className="relative rounded-2xl border border-gray-800 bg-gray-900/50 p-8 md:p-12">
            <Quote className="h-12 w-12 text-blue-500/20 mb-8" />
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Testimonial Content */}
              <div>
                <div className="flex gap-1 mb-8">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-blue-400 text-blue-400" />
                  ))}
                </div>
                
                <blockquote className="text-2xl font-medium mb-8">
                  "{testimonials[activeIndex].content}"
                </blockquote>
                
                <div>
                  <div className="font-bold text-lg">
                    {testimonials[activeIndex].author}
                  </div>
                  <div className="text-gray-400">
                    {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                  </div>
                </div>
              </div>

              {/* Company Logos Grid */}
              <div className="grid grid-cols-2 gap-8 lg:gap-12">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i}
                    className="aspect-video rounded-lg bg-gray-800/50 border border-gray-700 p-4 flex items-center justify-center"
                  >
                    <div className="text-gray-500">Logo</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4 mt-12">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-blue-500/20 hover:bg-blue-500/10"
                onClick={() => {
                  setAutoplay(false)
                  setActiveIndex((current) => 
                    current === 0 ? testimonials.length - 1 : current - 1
                  )
                }}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-blue-500/20 hover:bg-blue-500/10"
                onClick={() => {
                  setAutoplay(false)
                  setActiveIndex((current) => 
                    (current + 1) % testimonials.length
                  )
                }}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            { label: "Active Users", value: "10,000+" },
            { label: "Countries Served", value: "150+" },
            { label: "Revenue Processed", value: "$500M+" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-8 rounded-lg bg-gray-900/50 border border-gray-800"
            >
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}