"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { ShoppingCart, Minus, Plus, Trash2, X, Phone, CreditCard, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export function CartSheet() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartItemsCount, clearCart, addAdminNotification } =
    useStore()
  const { toast } = useToast()
  const router = useRouter()
  const [showCheckout, setShowCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderData, setOrderData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  })

  const handleRemoveItem = (productId: number, productName: string) => {
    removeFromCart(productId)
    toast({
      title: "تم حذف المنتج",
      description: `تم حذف ${productName} من سلة التسوق.`,
    })
  }

  const handleClearCart = () => {
    clearCart()
    toast({
      title: "تم تفريغ السلة",
      description: "تم حذف جميع المنتجات من سلة التسوق.",
    })
  }

  const handleContinueShopping = () => {
    router.push("/products")
  }

  const handlePlaceOrder = async () => {
    if (!orderData.name || !orderData.phone || !orderData.address || !orderData.city) {
      toast({
        title: "معلومات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase()

    toast({
      title: "تم تأكيد الطلب! 🎉",
      description: `رقم الطلب: ${orderNumber}. سنتصل بك خلال 30 دقيقة لتأكيد التفاصيل.`,
    })

    // Add admin notification
    addAdminNotification({
      type: "order",
      title: "طلب جديد!",
      message: `طلب جديد من ${orderData.name} بقيمة ${totalWithDelivery.toFixed(2)} ريال`,
      data: {
        orderNumber,
        customerName: orderData.name,
        customerPhone: orderData.phone,
        customerAddress: orderData.address,
        customerCity: orderData.city,
        total: totalWithDelivery,
        items: cart,
        notes: orderData.notes,
      },
      read: false,
    })

    // Clear cart and reset form
    clearCart()
    setOrderData({ name: "", phone: "", address: "", city: "", notes: "" })
    setShowCheckout(false)
    setIsSubmitting(false)
  }

  const deliveryFee = getCartTotal() >= 150 ? 0 : 25
  const totalWithDelivery = getCartTotal() + deliveryFee

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative w-9 h-9 sm:w-10 sm:h-10">
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          {getCartItemsCount() > 0 && (
            <Badge className="absolute -top-1 -left-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-red-500">
              {getCartItemsCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg arabic-text">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between text-lg sm:text-xl">
            سلة التسوق ({getCartItemsCount()})
            {cart.length > 0 && !showCheckout && (
              <Button variant="ghost" size="sm" onClick={handleClearCart}>
                <Trash2 className="w-4 h-4 ml-1" />
                تفريغ
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">سلة التسوق فارغة</h3>
                <p className="text-gray-500 mb-4">أضف بعض المنتجات للبدء!</p>
                <Button onClick={handleContinueShopping}>تصفح المنتجات</Button>
              </div>
            </div>
          ) : !showCheckout ? (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 border rounded-lg bg-white">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md cursor-pointer"
                        onClick={() => router.push(`/products/${item.id}`)}
                      />
                      <div className="flex-1 min-w-0">
                        <h4
                          className="font-medium text-sm line-clamp-2 cursor-pointer hover:text-purple-600"
                          onClick={() => router.push(`/products/${item.id}`)}
                        >
                          {item.name}
                        </h4>
                        <p className="text-lg font-bold text-purple-600 mt-1">{item.price} ريال</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveItem(item.id, item.name)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>المجموع الفرعي:</span>
                    <span className="font-bold">{getCartTotal().toFixed(2)} ريال</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>رسوم التوصيل:</span>
                    <span className={deliveryFee === 0 ? "text-green-600 font-bold" : ""}>
                      {deliveryFee === 0 ? "مجاني" : `${deliveryFee} ريال`}
                    </span>
                  </div>
                  {deliveryFee === 0 && (
                    <p className="text-sm text-green-600">🎉 توصيل مجاني للطلبات أكثر من 150 ريال</p>
                  )}
                  <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                    <span>الإجمالي:</span>
                    <span className="text-purple-600">{totalWithDelivery.toFixed(2)} ريال</span>
                  </div>
                </div>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <CreditCard className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">الدفع عند الاستلام</span>
                    </div>
                    <p className="text-sm text-green-700">ادفع نقداً عند وصول طلبك. آمن ومضمون 100%</p>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <Button className="w-full h-12" size="lg" onClick={() => setShowCheckout(true)}>
                    إتمام الطلب
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleContinueShopping}>
                    متابعة التسوق
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">معلومات التوصيل</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowCheckout(false)}>
                    <ArrowRight className="w-4 h-4 ml-1" />
                    العودة
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">الاسم الكامل *</label>
                    <Input
                      value={orderData.name}
                      onChange={(e) => setOrderData({ ...orderData, name: e.target.value })}
                      placeholder="أدخل اسمك الكامل"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">رقم الهاتف *</label>
                    <Input
                      value={orderData.phone}
                      onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
                      placeholder="05xxxxxxxx"
                      dir="ltr"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">المدينة *</label>
                    <Input
                      value={orderData.city}
                      onChange={(e) => setOrderData({ ...orderData, city: e.target.value })}
                      placeholder="الرياض، جدة، الدمام..."
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">العنوان التفصيلي *</label>
                    <Textarea
                      value={orderData.address}
                      onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                      placeholder="الحي، الشارع، رقم المبنى..."
                      rows={3}
                      className="min-h-[80px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">ملاحظات إضافية</label>
                    <Textarea
                      value={orderData.notes}
                      onChange={(e) => setOrderData({ ...orderData, notes: e.target.value })}
                      placeholder="أي ملاحظات خاصة للتوصيل..."
                      rows={2}
                      className="min-h-[60px]"
                    />
                  </div>
                </div>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">ملخص الطلب</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>عدد المنتجات:</span>
                        <span>{getCartItemsCount()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>المجموع:</span>
                        <span>{getCartTotal().toFixed(2)} ريال</span>
                      </div>
                      <div className="flex justify-between">
                        <span>التوصيل:</span>
                        <span>{deliveryFee === 0 ? "مجاني" : `${deliveryFee} ريال`}</span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-1">
                        <span>الإجمالي:</span>
                        <span>{totalWithDelivery.toFixed(2)} ريال</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <Button className="w-full h-12" size="lg" onClick={handlePlaceOrder} disabled={isSubmitting}>
                    {isSubmitting ? "جاري تأكيد الطلب..." : "تأكيد الطلب - الدفع عند الاستلام"}
                  </Button>

                  <div className="text-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <Phone className="w-4 h-4 inline ml-1" />
                    سنتصل بك على 0774525109 خلال 30 دقيقة لتأكيد الطلب
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
