"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, Heart, Eye, Phone, User, MapPin, Send, ShoppingBag } from "lucide-react"
import { useStore, type Product } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { cn, formatPriceSimple } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { wilayas, getCommunesByWilaya } from "@/lib/algeria-locations" // Import new data

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist, addAdminNotification } = useStore()
  const { toast } = useToast()
  const router = useRouter()
  const inWishlist = isInWishlist(product.id)

  const [showOrderForm, setShowOrderForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderData, setOrderData] = useState({
    fullName: "",
    phone: "",
    wilaya: "", // New field
    commune: "", // New field
    streetAddress: "", // For detailed address within commune
  })
  const [availableCommunes, setAvailableCommunes] = useState<string[]>([])

  // Update available communes when wilaya changes
  useEffect(() => {
    if (orderData.wilaya) {
      setAvailableCommunes(getCommunesByWilaya(orderData.wilaya))
      setOrderData((prev) => ({ ...prev, commune: "" })) // Reset commune when wilaya changes
    } else {
      setAvailableCommunes([])
    }
  }, [orderData.wilaya])

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast({
        title: "تم حذف المنتج من المفضلة",
        description: `${product.name} تم حذفه من قائمة الأمنيات`,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "تم إضافة المنتج للمفضلة! ❤️",
        description: `${product.name} تم إضافته لقائمة الأمنيات`,
      })
    }
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/products/${product.id}`)
  }

  const handleProductClick = () => {
    router.push(`/products/${product.id}`)
  }

  const handleOrderNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowOrderForm(!showOrderForm)
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (
      !orderData.fullName ||
      !orderData.phone ||
      !orderData.wilaya ||
      !orderData.commune ||
      !orderData.streetAddress
    ) {
      toast({
        title: "معلومات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase()

    // Add admin notification
    addAdminNotification({
      type: "order",
      title: "طلب جديد!",
      message: `طلب جديد من ${orderData.fullName} للمنتج: ${product.name}`,
      data: {
        orderNumber,
        customerName: orderData.fullName,
        customerPhone: orderData.phone,
        customerAddress: `${orderData.wilaya}, ${orderData.commune}, ${orderData.streetAddress}`, // Updated address format
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
        total: product.price,
      },
      read: false,
    })

    toast({
      title: "تم تأكيد طلبك! 🎉",
      description: `رقم الطلب: ${orderNumber}. سنتصل بك خلال 30 دقيقة على الرقم: ${orderData.phone}`,
    })

    // Reset form
    setOrderData({ fullName: "", phone: "", wilaya: "", commune: "", streetAddress: "" })
    setShowOrderForm(false)
    setIsSubmitting(false)
  }

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <Card className={cn("group modern-card", viewMode === "list" ? "flex flex-col sm:flex-row" : "")}>
      <CardHeader className={cn("p-0 relative", viewMode === "list" ? "w-full sm:w-48 flex-shrink-0" : "")}>
        <div className="relative overflow-hidden rounded-t-lg cursor-pointer" onClick={handleProductClick}>
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className={cn(
              "object-cover group-hover:scale-105 transition-transform duration-300",
              viewMode === "list" ? "w-full h-48 sm:h-32" : "w-full h-48 sm:h-56",
            )}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.badge && (
              <Badge variant="secondary" className="bg-white/90 text-gray-900 font-medium text-xs">
                {product.badge}
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge variant="destructive" className="bg-red-500 text-white text-xs">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="w-8 h-8 bg-white/90 hover:bg-white shadow-sm"
              onClick={handleWishlistToggle}
            >
              <Heart className={cn("w-4 h-4", inWishlist ? "fill-red-500 text-red-500" : "")} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="w-8 h-8 bg-white/90 hover:bg-white shadow-sm"
              onClick={handleQuickView}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <div className={viewMode === "list" ? "flex-1 flex flex-col" : ""}>
        <CardContent className="p-3 sm:p-4 flex-1">
          <h3
            className="font-semibold text-sm sm:text-lg mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors cursor-pointer"
            onClick={handleProductClick}
          >
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3 sm:w-4 sm:h-4",
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                  )}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-gray-600">({product.reviews})</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg sm:text-2xl font-bold text-purple-600">{formatPriceSimple(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                {formatPriceSimple(product.originalPrice)}
              </span>
            )}
          </div>

          {viewMode === "list" && (
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>
          )}
        </CardContent>

        <CardFooter className="p-3 sm:p-4 pt-0 flex-col space-y-3">
          <Button
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 text-sm sm:text-base h-10 sm:h-11 shadow-md hover:shadow-lg"
            onClick={handleOrderNow}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            اطلب الآن
          </Button>

          {/* Order Form */}
          {showOrderForm && (
            <div className="w-full bg-white/80 backdrop-blur-sm p-4 rounded-lg border-2 border-blue-200 shadow-md">
              <h4 className="font-semibold mb-3 text-sm text-blue-800 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                معلومات الطلب
              </h4>
              <form onSubmit={handleSubmitOrder} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-700">الاسم الكامل *</label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      value={orderData.fullName}
                      onChange={(e) => setOrderData({ ...orderData, fullName: e.target.value })}
                      placeholder="أدخل اسمك الكامل"
                      className="pr-10 h-10 text-sm border-blue-200 focus:border-blue-400 bg-white/70"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-700">رقم الهاتف *</label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      value={orderData.phone}
                      onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
                      placeholder="05xxxxxxxx"
                      dir="ltr"
                      className="pr-10 h-10 text-sm border-blue-200 focus:border-blue-400 bg-white/70"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-700">الولاية *</label>
                  <Select
                    value={orderData.wilaya}
                    onValueChange={(value) => setOrderData({ ...orderData, wilaya: value })}
                    required
                  >
                    <SelectTrigger className="h-10 text-sm border-blue-200 focus:border-blue-400">
                      <SelectValue placeholder="اختر الولاية" />
                    </SelectTrigger>
                    <SelectContent>
                      {wilayas.map((wilaya) => (
                        <SelectItem key={wilaya} value={wilaya}>
                          {wilaya}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-700">البلدية *</label>
                  <Select
                    value={orderData.commune}
                    onValueChange={(value) => setOrderData({ ...orderData, commune: value })}
                    disabled={!orderData.wilaya || availableCommunes.length === 0}
                    required
                  >
                    <SelectTrigger className="h-10 text-sm border-blue-200 focus:border-blue-400">
                      <SelectValue placeholder="اختر البلدية" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCommunes.map((commune) => (
                        <SelectItem key={commune} value={commune}>
                          {commune}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-700">
                    العنوان التفصيلي (الحي، الشارع، رقم المبنى) *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-3 text-gray-400 w-4 h-4" />
                    <Textarea
                      value={orderData.streetAddress}
                      onChange={(e) => setOrderData({ ...orderData, streetAddress: e.target.value })}
                      placeholder="الحي، الشارع، رقم المبنى..."
                      className="pr-10 min-h-[60px] text-sm border-blue-200 focus:border-blue-400 bg-white/70"
                      rows={2}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-10 text-sm shadow-md hover:shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "جاري الإرسال..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        تأكيد الطلب
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowOrderForm(false)}
                    className="bg-white/80 backdrop-blur-sm h-10 text-sm border-gray-300 shadow-sm hover:shadow-md"
                  >
                    إلغاء
                  </Button>
                </div>
              </form>

              <div className="mt-3 p-3 bg-green-50/80 backdrop-blur-sm rounded-lg border border-green-200 shadow-sm">
                <div className="flex items-center text-green-700 text-xs">
                  <Phone className="w-3 h-3 ml-1" />
                  <span className="font-medium">سنتصل بك خلال 30 دقيقة لتأكيد الطلب والتوصيل</span>
                </div>
                <div className="text-green-600 text-xs mt-1">
                  💰 الدفع عند الاستلام متاح | 🚚 توصيل مجاني للطلبات أكثر من 6,500 دينار جزائري
                </div>
              </div>
            </div>
          )}
        </CardFooter>
      </div>
    </Card>
  )
}
