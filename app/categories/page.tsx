"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { categories, products } from "@/lib/products"
import { Headphones, Watch, Smartphone, Monitor } from "lucide-react"

const categoryIcons = {
  Audio: Headphones,
  Wearables: Watch,
  Accessories: Smartphone,
  Computer: Monitor,
}

export default function CategoriesPage() {
  const categoryStats = categories.slice(1).map((category) => {
    const categoryProducts = products.filter((p) => p.category === category)
    const avgPrice = categoryProducts.reduce((sum, p) => sum + p.price, 0) / categoryProducts.length

    return {
      name: category,
      count: categoryProducts.length,
      avgPrice: avgPrice.toFixed(2),
      icon: categoryIcons[category as keyof typeof categoryIcons] || Monitor,
      image: categoryProducts[0]?.image || "/placeholder.svg?height=200&width=300",
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of tech products organized by category to help you find exactly what you need.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categoryStats.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.name}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 shadow-md"
                onClick={() => (window.location.href = `/products?category=${category.name}`)}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg h-48">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <IconComponent className="w-8 h-8 mb-2" />
                      <h3 className="text-xl font-bold">{category.name}</h3>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">{category.count} products</p>
                      <p className="text-sm text-gray-600">Avg. ${category.avgPrice}</p>
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      Popular
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Featured Categories */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Featured Categories</h2>
            <p className="text-xl opacity-90">
              Explore our most popular product categories with special deals and new arrivals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Headphones className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Audio Equipment</h3>
              <p className="opacity-90 mb-4">
                Premium headphones, speakers, and audio accessories for the ultimate sound experience.
              </p>
              <Badge className="bg-white/20 text-white border-white/30">
                {products.filter((p) => p.category === "Audio").length} Products
              </Badge>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Watch className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Wearable Tech</h3>
              <p className="opacity-90 mb-4">
                Smart watches, fitness trackers, and wearable devices to keep you connected.
              </p>
              <Badge className="bg-white/20 text-white border-white/30">
                {products.filter((p) => p.category === "Wearables").length} Products
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
