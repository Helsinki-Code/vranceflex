"use client"

import { Button } from "@/components/ui/button"
import { 
  TwitterIcon, 
  LinkedinIcon, 
  GithubIcon, 
  ArrowRight, 
  Globe2,
  Mail
} from "lucide-react"
import Link from "next/link"
import { BrandLogo } from "@/components/BrandLogo"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")

  return (
    <footer className="relative mt-32 border-t border-gray-800">
      {/* Newsletter Section */}
      <div className="absolute -top-28 left-4 right-4">
        <div className="container mx-auto max-w-7xl">
          <div className="relative rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 p-px">
            <div className="rounded-2xl bg-gray-900/90 p-8 backdrop-blur-xl">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Stay Updated with VranceFlex
                  </h3>
                  <p className="text-gray-300">
                    Get the latest updates on global pricing trends and platform features.
                  </p>
                </div>
                <div className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 
                             focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button 
                    className="bg-blue-500 hover:bg-blue-400 transition-colors px-8"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto max-w-7xl px-4 pt-40 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-6 lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <BrandLogo />
            </Link>
            <p className="text-gray-400 mb-6">
              Transform your global pricing strategy with AI-powered solutions. 
              Reach more customers and maximize revenue across all markets.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={TwitterIcon} />
              <SocialLink href="#" icon={LinkedinIcon} />
              <SocialLink href="#" icon={GithubIcon} />
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="col-span-2">
            <FooterColumn 
              title="Product"
              links={[
                { label: "Features", href: "#" },
                { label: "Pricing", href: "#pricing" },
                { label: "Enterprise", href: "#" },
                { label: "Changelog", href: "#" },
              ]}
            />
          </div>

          <div className="col-span-2">
            <FooterColumn 
              title="Resources"
              links={[
                { label: "Documentation", href: "#" },
                { label: "API Reference", href: "#" },
                { label: "Tutorials", href: "#" },
                { label: "Blog", href: "#" },
              ]}
            />
          </div>

          <div className="col-span-2">
            <FooterColumn 
              title="Company"
              links={[
                { label: "About Us", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Contact", href: "#" },
                { label: "Partners", href: "#" },
              ]}
            />
          </div>

          <div className="col-span-2">
            <FooterColumn 
              title="Legal"
              links={[
                { label: "Privacy", href: "#" },
                { label: "Terms", href: "#" },
                { label: "Security", href: "#" },
                { label: "Cookies", href: "#" },
              ]}
            />
          </div>
        </div>

        {/* Contact & Location */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 border-y border-gray-800">
          <ContactInfo 
            icon={Mail}
            title="Email Us"
            content="support@vranceflex.com"
            link="mailto:support@vranceflex.com"
          />
          <ContactInfo 
            icon={Globe2}
            title="Global Presence"
            content="Serving customers in 150+ countries"
          />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} VranceFlex. All rights reserved.
          </div>
          <div className="flex gap-8">
            <StatusIndicator />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon: Icon }: { href: string; icon: any }) {
  return (
    <Link 
      href={href}
      className="p-2 rounded-lg bg-gray-800/50 hover:bg-blue-500/10 
                 text-gray-400 hover:text-blue-400 transition-colors"
    >
      <Icon className="h-5 w-5" />
    </Link>
  )
}

function FooterColumn({ title, links }: { 
  title: string; 
  links: { label: string; href: string; }[] 
}) {
  return (
    <div>
      <h4 className="font-semibold mb-4">{title}</h4>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              href={link.href}
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ContactInfo({ 
  icon: Icon, 
  title, 
  content, 
  link 
}: { 
  icon: any; 
  title: string; 
  content: string;
  link?: string;
}) {
  const ContentWrapper = link ? Link : 'div'
  
  return (
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-lg bg-gray-800/50">
        <Icon className="h-6 w-6 text-blue-400" />
      </div>
      <div>
        <div className="text-sm text-gray-400">{title}</div>
        <ContentWrapper 
          {...(link ? { href: link } : {})}
          className={`font-medium ${link ? 'hover:text-blue-400 transition-colors' : ''}`}
        >
          {content}
        </ContentWrapper>
      </div>
    </div>
  )
}

function StatusIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-gray-400">All systems operational</span>
      </div>
      <Link 
        href="#"
        className="text-blue-400 hover:text-blue-300 transition-colors"
      >
        Status
      </Link>
    </div>
  )
}

function LanguageSelector() {
  return (
    <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors">
      <Globe2 className="h-4 w-4" />
      English (US)
    </button>
  )
}