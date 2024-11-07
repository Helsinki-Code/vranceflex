"use client"

import { BrandLogo } from "@/components/BrandLogo"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { 
  ChevronDown, 
  Laptop, 
  BarChart3, 
  Globe2,
  ShieldCheck,
  MessagesSquare,
  BookOpen,
  ArrowRight
} from "lucide-react"

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 
      ${isScrolled 
        ? 'bg-background/80 backdrop-blur-xl border-b border-gray-800' 
        : 'bg-transparent'}`}>
      <nav className="container mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-20 px-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <BrandLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {/* Features Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('features')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-2 text-sm font-medium hover:text-blue-400 transition-colors py-2">
                Features
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {activeDropdown === 'features' && (
                <div className="absolute top-full -left-4 w-[400px] p-2 rounded-xl bg-gray-900/95 backdrop-blur-sm border border-gray-800 shadow-xl">
                  <div className="grid grid-cols-2 gap-2 p-3">
                    <DropdownItem
                      icon={Globe2}
                      title="Global Pricing"
                      description="Location-based dynamic pricing"
                      href="#"
                    />
                    <DropdownItem
                      icon={BarChart3}
                      title="Analytics"
                      description="Advanced metrics & insights"
                      href="#"
                    />
                    <DropdownItem
                      icon={ShieldCheck}
                      title="Security"
                      description="Enterprise-grade protection"
                      href="#"
                    />
                    <DropdownItem
                      icon={Laptop}
                      title="Integrations"
                      description="Connect with your stack"
                      href="#"
                    />
                  </div>
                  <div className="border-t border-gray-800 p-3">
                    <Link 
                      href="#"
                      className="flex items-center justify-between text-sm text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <span>View all features</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-2 text-sm font-medium hover:text-blue-400 transition-colors py-2">
                Resources
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {activeDropdown === 'resources' && (
                <div className="absolute top-full -left-4 w-[400px] p-2 rounded-xl bg-gray-900/95 backdrop-blur-sm border border-gray-800 shadow-xl">
                  <div className="grid grid-cols-2 gap-2 p-3">
                    <DropdownItem
                      icon={BookOpen}
                      title="Documentation"
                      description="Guides & tutorials"
                      href="#"
                    />
                    <DropdownItem
                      icon={MessagesSquare}
                      title="Community"
                      description="Join our community"
                      href="#"
                    />
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/#pricing" 
              className="text-sm font-medium hover:text-blue-400 transition-colors"
            >
              Pricing
            </Link>

            <Link 
              href="#" 
              className="text-sm font-medium hover:text-blue-400 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button 
                  variant="outline"
                  className="border-blue-500/20 hover:bg-blue-500/10"
                >
                  Dashboard
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <div className="hidden sm:block">
                <SignInButton mode="modal">
                  <Button 
                    variant="ghost"
                    className="hover:bg-blue-500/10"
                  >
                    Sign In
                  </Button>
                </SignInButton>
              </div>
              <SignInButton mode="modal">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-blue-400 
                           hover:from-blue-500 hover:to-blue-300"
                >
                  Get Started
                </Button>
              </SignInButton>
            </SignedOut>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transition-all ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`} />
                <span className={`w-full h-0.5 bg-current transition-all ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`} />
                <span className={`w-full h-0.5 bg-current transition-all ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-800 bg-background">
            <div className="p-4 space-y-4">
              <Link 
                href="#"
                className="block p-3 rounded-lg hover:bg-gray-800"
              >
                Features
              </Link>
              <Link 
                href="#"
                className="block p-3 rounded-lg hover:bg-gray-800"
              >
                Resources
              </Link>
              <Link 
                href="/#pricing"
                className="block p-3 rounded-lg hover:bg-gray-800"
              >
                Pricing
              </Link>
              <Link 
                href="#"
                className="block p-3 rounded-lg hover:bg-gray-800"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

function DropdownItem({ 
  icon: Icon, 
  title, 
  description, 
  href 
}: { 
  icon: any;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link 
      href={href}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors group"
    >
      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-medium group-hover:text-blue-400 transition-colors">
          {title}
        </div>
        <div className="text-sm text-gray-400">
          {description}
        </div>
      </div>
    </Link>
  )
}