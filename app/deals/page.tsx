"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { Timer, Zap, Gift, Star } from "lucide-react"
import Link from "next/link"

export default function DealsPage() {
  // Filter products with discounts
  const dealsProducts = products.filter((product) => product.originalPrice > product.price)
  const flashDeals = dealsProducts.slice(0, 4)
  const dailyDeals = dealsProducts.slice(4, 8)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white mb-12">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">🔥 Limited Time Offers</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Amazing Deals</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Save up to 50% on selected tech products. Don't miss out!
            </p>
            <div className="flex items-center justify-center gap-4 text-lg">
              <Timer className="w-6 h-6" />
              <span>Deals end in: 2 days 14 hours 32 minutes</span>
            </div>
          </div>
        </div>

        {/* Deal Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-xl">Flash Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Lightning-fast deals that won't last long. Grab them while you can!</p>
              <Badge variant="destructive">Up to 50% OFF</Badge>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Gift className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Daily Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">New deals every day. Check back regularly for fresh savings.</p>
              <Badge className="bg-blue-600">Up to 30% OFF</Badge>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Premium Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Exclusive deals on premium products for our valued customers.</p>
              <Badge className="bg-purple-600">Up to 40% OFF</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Flash Deals */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center">
                <Zap className="w-8 h-8 text-red-600 mr-2" />
                Flash Deals
              </h2>
              <p className="text-gray-600">Limited time offers - act fast!</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products">View All</Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Daily Deals */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center">
                <Gift className="w-8 h-8 text-blue-600 mr-2" />
                Daily Deals
              </h2>
              <p className="text-gray-600">Fresh deals updated every 24 hours</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products">View All</Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dailyDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Never Miss a Deal</h3>
          <p className="text-xl mb-6 opacity-90">Subscribe to get notified about flash sales and exclusive offers.</p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            Subscribe Now
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
