"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"
import { useStore } from "@/lib/store"
import { categories, priceRanges } from "@/lib/products"

interface ProductFiltersProps {
  className?: string
}

export function ProductFilters({ className }: ProductFiltersProps) {
  const { selectedCategory, setSelectedCategory, selectedPriceRange, setSelectedPriceRange, sortBy, setSortBy } =
    useStore()

  const [priceRange, setPriceRange] = useState([0, 50000])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "All" : category)
  }

  const handlePriceRangeChange = (range: string) => {
    const currentRanges = [...selectedPriceRange]
    const index = currentRanges.indexOf(range)

    if (index > -1) {
      currentRanges.splice(index, 1)
    } else {
      currentRanges.push(range)
    }

    setSelectedPriceRange(currentRanges)
  }

  const clearFilters = () => {
    setSelectedCategory("All")
    setSelectedPriceRange([])
    setSortBy("featured")
    setPriceRange([0, 50000])
  }

  const hasActiveFilters = selectedCategory !== "All" || selectedPriceRange.length > 0

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Filter className="w-5 h-5 mr-2" />
            تصفية المنتجات
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              مسح الكل
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sort By */}
        <div>
          <h3 className="font-medium mb-3">ترتيب حسب</h3>
          <div className="space-y-2">
            {[
              { value: "featured", label: "المميزة" },
              { value: "price-low", label: "السعر: من الأقل للأعلى" },
              { value: "price-high", label: "السعر: من الأعلى للأقل" },
              { value: "rating", label: "التقييم" },
              { value: "newest", label: "الأحدث" },
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id={option.value}
                  checked={sortBy === option.value}
                  onCheckedChange={() => setSortBy(option.value)}
                />
                <label htmlFor={option.value} className="text-sm cursor-pointer">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-medium mb-3">الأقسام</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id={category}
                  checked={selectedCategory === category}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <label htmlFor={category} className="text-sm cursor-pointer">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Ranges */}
        <div>
          <h3 className="font-medium mb-3">نطاق السعر</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <div key={range.label} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id={range.label}
                  checked={selectedPriceRange.includes(range.label)}
                  onCheckedChange={() => handlePriceRangeChange(range.label)}
                />
                <label htmlFor={range.label} className="text-sm cursor-pointer">
                  {range.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Price Range */}
        <div>
          <h3 className="font-medium mb-3">نطاق سعر مخصص</h3>
          <div className="px-2">
            <Slider value={priceRange} onValueChange={setPriceRange} max={50000} min={0} step={500} className="mb-4" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{priceRange[0].toLocaleString()} دينار</span>
              <span>{priceRange[1].toLocaleString()} دينار</span>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div>
            <h3 className="font-medium mb-3">المرشحات النشطة</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== "All" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedCategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("All")} />
                </Badge>
              )}
              {selectedPriceRange.map((range) => (
                <Badge key={range} variant="secondary" className="flex items-center gap-1">
                  {range}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => handlePriceRangeChange(range)} />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
