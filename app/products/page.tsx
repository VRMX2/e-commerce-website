"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, Grid, List, X, Search, SlidersHorizontal } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useStore } from "@/lib/store"
import { products, categories, priceRanges } from "@/lib/products"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function ProductsPage() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPriceRange,
    setSelectedPriceRange,
    sortBy,
    setSortBy,
  } = useStore()

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Sync local search with global search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [localSearchQuery, setSearchQuery])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "الكل" || product.category === selectedCategory
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPrice =
        selectedPriceRange.length === 0 ||
        selectedPriceRange.some((range) => {
          const priceRange = priceRanges.find((r) => r.label === range)
          return priceRange && product.price >= priceRange.min && product.price <= priceRange.max
        })

      return matchesCategory && matchesSearch && matchesPrice
    })
  }, [selectedCategory, searchQuery, selectedPriceRange])

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
          return a.name.localeCompare(b.name)
        case "newest":
          return b.id - a.id
        default:
          return 0
      }
    })
  }, [filteredProducts, sortBy])

  const clearFilters = () => {
    setSelectedCategory("الكل")
    setSelectedPriceRange([])
    setLocalSearchQuery("")
    setSearchQuery("")
  }

  const hasActiveFilters = selectedCategory !== "الكل" || selectedPriceRange.length > 0 || searchQuery

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          الفلاتر
        </h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-1" />
            مسح
          </Button>
        )}
      </div>

      {/* Search */}
      <div>
        <label className="text-sm font-medium mb-2 block">البحث</label>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="ابحث في المنتجات..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="pr-10 h-12"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="text-sm font-medium mb-3 block">الأقسام</label>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id={category}
                checked={selectedCategory === category}
                onCheckedChange={() => setSelectedCategory(category)}
              />
              <label htmlFor={category} className="text-sm cursor-pointer flex-1">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-medium mb-3 block">نطاق السعر</label>
        <div className="space-y-3">
          {priceRanges.map((range) => (
            <div key={range.label} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id={range.label}
                checked={selectedPriceRange.includes(range.label)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedPriceRange([...selectedPriceRange, range.label])
                  } else {
                    setSelectedPriceRange(selectedPriceRange.filter((r) => r !== range.label))
                  }
                }}
              />
              <label htmlFor={range.label} className="text-sm cursor-pointer flex-1">
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-xl border-0 shadow-md sticky top-24">
              <FilterContent />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col gap-4 mb-6 sm:mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">المنتجات</h1>
                <p className="text-gray-600">
                  عرض {sortedProducts.length} من {products.length} منتج
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* Mobile Filters Button */}
                <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden bg-white">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      الفلاتر
                      {hasActiveFilters && (
                        <span className="mr-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                          {(selectedCategory !== "الكل" ? 1 : 0) + selectedPriceRange.length}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <SheetHeader>
                      <SheetTitle>الفلاتر</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-48 h-12">
                      <SelectValue placeholder="ترتيب حسب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">مميز</SelectItem>
                      <SelectItem value="newest">الأحدث</SelectItem>
                      <SelectItem value="price-low">السعر: من الأقل للأعلى</SelectItem>
                      <SelectItem value="price-high">السعر: من الأعلى للأقل</SelectItem>
                      <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                      <SelectItem value="name">الاسم: أ إلى ي</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode */}
                  <div className="hidden sm:flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="h-12 px-3"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="h-12 px-3"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            {sortedProducts.length > 0 ? (
              <div
                className={`grid gap-4 sm:gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Filter className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">لم يتم العثور على منتجات</h3>
                  <p className="text-gray-500 mb-6">
                    لم نتمكن من العثور على أي منتجات تطابق معايير البحث. جرب تعديل الفلاتر.
                  </p>
                  <Button variant="outline" onClick={clearFilters} className="bg-white">
                    مسح جميع الفلاتر
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
