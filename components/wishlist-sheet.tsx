"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Heart, X, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { formatPrice, getImageUrl } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export function WishlistSheet() {
  const { wishlist, removeFromWishlist, addToCart } = useStore()

  const handleAddToCart = (productId: string) => {
    const product = wishlist.find((p) => p.id === productId)
    if (product) {
      addToCart(product, 1)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className="h-5 w-5" />
          {wishlist.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {wishlist.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-right">قائمة الأمنيات</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">قائمة الأمنيات فارغة</p>
              <p className="text-sm text-muted-foreground mt-2">أضف المنتجات التي تعجبك لحفظها هنا</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {wishlist.map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={getImageUrl(product.image) || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${product.id}`}
                        className="font-medium text-sm hover:text-primary line-clamp-2"
                      >
                        {product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-semibold text-primary">
                          {formatPrice(product.salePrice || product.price)}
                        </span>
                        {product.salePrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button size="sm" onClick={() => handleAddToCart(product.id)} className="h-8 w-8 p-0">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromWishlist(product.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>إجمالي المنتجات</span>
                  <span>{wishlist.length} منتج</span>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
