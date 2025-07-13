"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Star,
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ArrowLeft,
  Phone,
  User,
  MapPin,
  Send,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { products } from "@/lib/products"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { wilayas, getCommunesByWilaya } from "@/lib/algeria-locations" // Import new data

export default function ProductPage() {
  const params = useParams()
  const productId = Number.parseInt(params.id as string)
  const product = products.find((p) => p.id === productId)

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [mounted, setMounted] = useState(false)
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

  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, addAdminNotification } = useStore()
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Update available communes when wilaya changes
  useEffect(() => {
    if (orderData.wilaya) {
      setAvailableCommunes(getCommunesByWilaya(orderData.wilaya))
      setOrderData((prev) => ({ ...prev, commune: "" })) // Reset commune when wilaya changes
    } else {
      setAvailableCommunes([])
    }
  }, [orderData.wilaya])

  if (!mounted || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <Button asChild className="mt-4">
              <Link href="/products">Back to Products</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)
  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast({
      title: "تم إضافة المنتج للسلة",
      description: `${quantity}x ${product.name} تم إضافته لسلة التسوق.`,
    })
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast({
        title: "تم حذف المنتج من المفضلة",
        description: `${product.name} تم حذفه من قائمة الأمنيات.`,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "تم إضافة المنتج للمفضلة",
        description: `${product.name} تم إضافته لقائمة الأمنيات.`,
      })
    }
  }

  const handleOrderNow = () => {
    setShowOrderForm(!showOrderForm)
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()

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
        total: product.price * quantity,
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

  // Mock images array for the gallery
  const images = [product.image, product.image, product.image, product.image]

  return (
    <div className="min-h-screen bg-background arabic-text">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-purple-600">
            الرئيسية
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-purple-600">
            المنتجات
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-purple-600">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate">{product.name}</span>
        </nav>

        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/products">
            <ArrowLeft className="w-4 h-4 mr-2" />
            العودة للمنتجات
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl border-0 shadow-lg">
              <img
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index ? "border-purple-600 shadow-md" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                {product.badge && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {product.badge}
                  </Badge>
                )}
                {discountPercentage > 0 && <Badge variant="destructive">-{discountPercentage}% خصم</Badge>}
              </div>
              <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} تقييم)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-purple-600">{product.price.toLocaleString()} دينار جزائري</span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-gray-500 line-through">
                  {product.originalPrice.toLocaleString()} دينار جزائري
                </span>
              )}
              {discountPercentage > 0 && (
                <Badge variant="destructive" className="text-sm">
                  وفر {(product.originalPrice - product.price).toLocaleString()} دينار
                </Badge>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-medium text-lg">الكمية:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-6 py-2 min-w-[4rem] text-center text-lg font-medium">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  إضافة للسلة
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent" onClick={handleWishlistToggle}>
                  <Heart className={`w-5 h-5 ${inWishlist ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg py-6"
                onClick={handleOrderNow}
              >
                اطلب الآن
              </Button>

              {showOrderForm && (
                <div className="w-full bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200">
                  <h4 className="font-semibold mb-4 text-lg text-blue-800 flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    معلومات الطلب
                  </h4>
                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">الاسم الكامل *</label>
                      <div className="relative">
                        <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          value={orderData.fullName}
                          onChange={(e) => setOrderData({ ...orderData, fullName: e.target.value })}
                          placeholder="أدخل اسمك الكامل"
                          className="pr-12 h-12 text-base border-blue-200 focus:border-blue-400"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">رقم الهاتف *</label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          value={orderData.phone}
                          onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
                          placeholder="05xxxxxxxx"
                          dir="ltr"
                          className="pr-12 h-12 text-base border-blue-200 focus:border-blue-400"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">الولاية *</label>
                      <Select
                        value={orderData.wilaya}
                        onValueChange={(value) => setOrderData({ ...orderData, wilaya: value })}
                        required
                      >
                        <SelectTrigger className="h-12 text-base border-blue-200 focus:border-blue-400">
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
                      <label className="block text-sm font-medium mb-2 text-gray-700">البلدية *</label>
                      <Select
                        value={orderData.commune}
                        onValueChange={(value) => setOrderData({ ...orderData, commune: value })}
                        disabled={!orderData.wilaya || availableCommunes.length === 0}
                        required
                      >
                        <SelectTrigger className="h-12 text-base border-blue-200 focus:border-blue-400">
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
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        العنوان التفصيلي (الحي، الشارع، رقم المبنى) *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                        <Textarea
                          value={orderData.streetAddress}
                          onChange={(e) => setOrderData({ ...orderData, streetAddress: e.target.value })}
                          placeholder="الحي، الشارع، رقم المبنى..."
                          className="pr-12 min-h-[80px] text-base border-blue-200 focus:border-blue-400"
                          rows={3}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12 text-base"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "جاري الإرسال..."
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            تأكيد الطلب
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowOrderForm(false)}
                        className="bg-white h-12 text-base border-gray-300"
                      >
                        إلغاء
                      </Button>
                    </div>
                  </form>

                  <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center text-green-700 text-sm mb-2">
                      <Phone className="w-4 h-4 ml-2" />
                      <span className="font-medium">سنتصل بك خلال 30 دقيقة لتأكيد الطلب والتوصيل</span>
                    </div>
                    <div className="text-green-600 text-sm">
                      💰 الدفع عند الاستلام متاح | 🚚 توصيل مجاني للطلبات أكثر من 6,500 دينار جزائري
                    </div>
                    <div className="text-green-600 text-sm mt-1">
                      📦 إجمالي الطلب: {(product.price * quantity).toLocaleString()} دينار جزائري (الكمية: {quantity})
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">توصيل مجاني</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">ضمان سنتين</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <RotateCcw className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium">إرجاع خلال 30 يوم</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">الوصف</TabsTrigger>
            <TabsTrigger value="specifications">المواصفات</TabsTrigger>
            <TabsTrigger value="reviews">التقييمات</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">وصف المنتج</h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">{product.description}</p>
                <h4 className="font-semibold mb-4 text-lg">الميزات الرئيسية:</h4>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">المواصفات التقنية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-900">{key}:</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">تقييمات العملاء</h3>
                <div className="space-y-8">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="font-medium">أحمد محمد</span>
                        <span className="text-sm text-gray-500">منذ يومين</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        منتج رائع! الجودة فاقت توقعاتي والتوصيل كان سريع جداً. أنصح بشدة بهذا المنتج لأي شخص يبحث عن جهاز{" "}
                        {product.category.toLowerCase()} موثوق.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">منتجات ذات صلة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
