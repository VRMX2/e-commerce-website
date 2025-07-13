"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useStore } from "@/lib/store"
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, clearWishlist } = useStore()
  const { toast } = useToast()
  const router = useRouter()

  const handleRemoveFromWishlist = (productId: number, productName: string) => {
    removeFromWishlist(productId)
    toast({
      title: "تم حذف المنتج من المفضلة",
      description: `${productName} تم حذفه من قائمة الأمنيات`,
    })
  }

  const handleAddToCart = (product: any) => {
    addToCart(product)
    toast({
      title: "تم إضافة المنتج للسلة! 🛒",
      description: `${product.name} تم إضافته لسلة التسوق`,
    })
  }

  const handleClearWishlist = () => {
    clearWishlist()
    toast({
      title: "تم مسح قائمة الأمنيات",
      description: "تم حذف جميع المنتجات من قائمة الأمنيات",
    })
  }

  return (
    <div className="min-h-screen bg-background arabic-text">
      <Header />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <Button variant="ghost" className="mb-4 p-0" asChild>
              <Link href="/products">
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للمنتجات
              </Link>
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">قائمة الأمنيات</h1>
            <p className="text-gray-600">
              {wishlist.length > 0 ? `${wishlist.length} منتج في قائمة الأمنيات` : "قائمة الأمنيات فارغة"}
            </p>
          </div>
          {wishlist.length > 0 && (
            <Button variant="outline" onClick={handleClearWishlist} className="bg-white">
              <Trash2 className="w-4 h-4 ml-2" />
              مسح الكل
            </Button>
          )}
        </div>

        {/* Wishlist Content */}
        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h3 className="text-xl font-medium text-gray-900 mb-4">قائمة الأمنيات فارغة</h3>
            <p className="text-gray-500 mb-6">احفظ المنتجات التي تعجبك لتتمكن من العودة إليها لاحقاً!</p>
            <Button asChild>
              <Link href="/products">تصفح المنتجات</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg cursor-pointer group-hover:scale-105 transition-transform duration-300"
                      onClick={() => router.push(`/products/${item.id}`)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 w-8 h-8 bg-white/80 hover:bg-white text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <h3
                      className="font-semibold text-sm line-clamp-2 cursor-pointer hover:text-purple-600 transition-colors"
                      onClick={() => router.push(`/products/${item.id}`)}
                    >
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-purple-600">{item.price} ريال</span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-gray-500 line-through">{item.originalPrice} ريال</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-10"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        أضف للسلة
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-white"
                        onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
