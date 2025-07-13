"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Mail, CheckCircle } from "lucide-react"

interface NewsletterSignupProps {
  className?: string
  variant?: "default" | "compact"
}

export function NewsletterSignup({ className, variant = "default" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubscribed(true)
    setIsLoading(false)
    setEmail("")

    toast({
      title: "Successfully subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    })

    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || isSubscribed}>
          {isLoading ? "..." : isSubscribed ? <CheckCircle className="w-4 h-4" /> : "Subscribe"}
        </Button>
      </form>
    )
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
            <Mail className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
          <p className="text-gray-600">Get the latest deals and product updates delivered to your inbox.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={isLoading || isSubscribed}>
            {isLoading ? "Subscribing..." : isSubscribed ? "Subscribed!" : "Subscribe Now"}
          </Button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">We respect your privacy. Unsubscribe at any time.</p>
      </CardContent>
    </Card>
  )
}
