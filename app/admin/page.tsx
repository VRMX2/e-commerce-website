"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  Bell,
  Eye,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  BarChart3,
  DollarSign,
  MessageSquare,
  Settings,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { protectRoute } from "@/lib/auth"

interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerPhone: string
  customerAddress: string
  product: {
    id: number
    name: string
    price: number
    image: string
  }
  total: number
  status: "pending" | "confirmed" | "delivered" | "cancelled"
  createdAt: Date
}

export default async function AdminPage() {
  await protectRoute(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    todayOrders: 0,
    weeklyGrowth: 12.5,
  })
  const { toast } = useToast()

  // Simulate receiving new orders
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random new order
      if (Math.random() > 0.8) {
        const customerNames = ["أحمد محمد", "فاطمة علي", "محمد سالم", "نورا أحمد", "خالد عبدالله"]
        const cities = ["الجزائر", "وهران", "قسنطينة", "عنابة", "سطيف"]
        const products = [
          { id: 1, name: "سماعات بلوتوث لاسلكية فاخرة", price: 12999 },
          { id: 2, name: "ساعة ذكية رياضية متقدمة", price: 25999 },
          { id: 3, name: "شاحن محمول سريع فائق القوة", price: 3899 },
          { id: 4, name: "فأرة ألعاب لاسلكية مريحة", price: 6499 },
        ]

        const randomProduct = products[Math.floor(Math.random() * products.length)]
        const randomName = customerNames[Math.floor(Math.random() * customerNames.length)]
        const randomCity = cities[Math.floor(Math.random() * cities.length)]

        const newOrder: Order = {
          id: Math.random().toString(36).substr(2, 9),
          orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
          customerName: randomName,
          customerPhone: `05${Math.floor(Math.random() * 100000000)
            .toString()
            .padStart(8, "0")}`,
          customerAddress: `${randomCity}, حي النموذجي، شارع ${Math.floor(Math.random() * 100)}`,
          product: {
            ...randomProduct,
            image: "/placeholder.svg?height=400&width=400",
          },
          total: randomProduct.price,
          status: "pending",
          createdAt: new Date(),
        }

        setOrders((prev) => [newOrder, ...prev])

        // Show notification with admin contact info
        toast({
          title: "🔔 طلب جديد وصل!",
          description: `طلب من ${newOrder.customerName} - ${(newOrder.total).toLocaleString()} دينار جزائري. تم إرسال التفاصيل إلى lehcengrissi@gmail.com`,
        })

        // Update stats
        setStats((prev) => ({
          ...prev,
          totalOrders: prev.totalOrders + 1,
          pendingOrders: prev.pendingOrders + 1,
          totalRevenue: prev.totalRevenue + newOrder.total,
          todayOrders: prev.todayOrders + 1,
        }))
      }
    }, 15000) // Check every 15 seconds

    return () => clearInterval(interval)
  }, [toast])

  // Filter orders based on search and status
  useEffect(() => {
    let filtered = orders

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerPhone.includes(searchQuery),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [orders, searchQuery, statusFilter])

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))

    if (newStatus === "confirmed") {
      setStats((prev) => ({ ...prev, pendingOrders: prev.pendingOrders - 1 }))
    }

    toast({
      title: "تم تحديث حالة الطلب",
      description: `تم تغيير حالة الطلب إلى ${getStatusText(newStatus)}`,
    })
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "في الانتظار"
      case "confirmed":
        return "مؤكد"
      case "delivered":
        return "تم التوصيل"
      case "cancelled":
        return "ملغي"
      default:
        return status
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-4 h-4" />
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 arabic-text">
      {/* Modern Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                لوحة إدارة اشرقت
              </h1>
              <p className="text-gray-600 text-sm">مرحباً بك، لحسن الجريسي</p>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600">متصل</span>
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {stats.pendingOrders > 0 && (
                  <Badge className="absolute -top-1 -left-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    {stats.pendingOrders}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-xs sm:text-sm">إجمالي الطلبات</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.totalOrders}</p>
                  <p className="text-purple-200 text-xs">+{stats.todayOrders} اليوم</p>
                </div>
                <div className="bg-white/20 p-2 sm:p-3 rounded-full">
                  <ShoppingCart className="w-5 h-5 sm:w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-xs sm:text-sm">في الانتظار</p>
                  <p className="text-xl sm:text-2xl font-bold text-amber-50">{stats.pendingOrders}</p>
                  <p className="text-amber-200 text-xs">يحتاج متابعة</p>
                </div>
                <div className="bg-white/20 p-2 sm:p-3 rounded-full">
                  <AlertCircle className="w-5 h-5 sm:w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-xs sm:text-sm">إجمالي المبيعات</p>
                  <p className="text-lg sm:text-xl font-bold">{stats.totalRevenue.toLocaleString()} دج</p>
                  <p className="text-emerald-200 text-xs">+{stats.weeklyGrowth}% هذا الأسبوع</p>
                </div>
                <div className="bg-white/20 p-2 sm:p-3 rounded-full">
                  <DollarSign className="w-5 h-5 sm:w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-xs sm:text-sm">العملاء</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.totalCustomers}</p>
                  <p className="text-blue-200 text-xs">عميل نشط</p>
                </div>
                <div className="bg-white/20 p-2 sm:p-3 rounded-full">
                  <Users className="w-5 h-5 sm:w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Contact Info Card */}
        <Card className="mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">معلومات المدير</h3>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 ml-2" />
                    <span dir="ltr">0774525109</span>
                  </p>
                  <p className="flex items-center">
                    <MessageSquare className="w-4 h-4 ml-2" />
                    lehcengrissi@gmail.com
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-indigo-100 text-sm">ستصلك إشعارات الطلبات الجديدة</p>
                <p className="text-indigo-200 text-xs">تحديث تلقائي كل 15 ثانية</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Orders Management */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="orders" className="data-[state=active]:bg-white">
              الطلبات
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white">
              التحليلات
            </TabsTrigger>
            <TabsTrigger value="customers" className="data-[state=active]:bg-white">
              العملاء
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl">إدارة الطلبات</CardTitle>
                    <p className="text-gray-600 text-sm">إجمالي {filteredOrders.length} طلب</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="البحث في الطلبات..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-10 w-full sm:w-64"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border rounded-md bg-white text-sm"
                    >
                      <option value="all">جميع الحالات</option>
                      <option value="pending">في الانتظار</option>
                      <option value="confirmed">مؤكد</option>
                      <option value="delivered">تم التوصيل</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <Package className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {searchQuery || statusFilter !== "all" ? "لا توجد نتائج" : "لا توجد طلبات حالياً"}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {searchQuery || statusFilter !== "all"
                          ? "جرب تغيير معايير البحث"
                          : "ستظهر الطلبات الجديدة هنا تلقائياً"}
                      </p>
                    </div>
                  ) : (
                    filteredOrders.map((order) => (
                      <Card
                        key={order.id}
                        className="border border-gray-200 hover:shadow-md transition-all duration-200 bg-white"
                      >
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                                <h3 className="font-semibold text-lg">طلب #{order.orderNumber}</h3>
                                <Badge className={`${getStatusColor(order.status)} border w-fit`}>
                                  {getStatusIcon(order.status)}
                                  <span className="mr-1">{getStatusText(order.status)}</span>
                                </Badge>
                              </div>
                              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                  <div className="flex items-center text-gray-600">
                                    <Clock className="w-4 h-4 ml-2" />
                                    {order.createdAt.toLocaleString("ar-DZ")}
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <DollarSign className="w-4 h-4 ml-2" />
                                    <span className="font-bold text-purple-600">
                                      {order.total.toLocaleString()} دينار جزائري
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid lg:grid-cols-2 gap-6">
                            <div className="bg-gray-50 rounded-lg p-4">
                              <h4 className="font-medium mb-3 flex items-center">
                                <Users className="w-4 h-4 ml-2" />
                                معلومات العميل
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">الاسم:</span>
                                  <span className="font-medium">{order.customerName}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">الهاتف:</span>
                                  <span className="font-medium" dir="ltr">
                                    {order.customerPhone}
                                  </span>
                                </div>
                                <div className="flex items-start justify-between">
                                  <span className="text-gray-600">العنوان:</span>
                                  <span className="font-medium text-right max-w-[200px]">{order.customerAddress}</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-blue-50 rounded-lg p-4">
                              <h4 className="font-medium mb-3 flex items-center">
                                <Package className="w-4 h-4 ml-2" />
                                تفاصيل الطلب
                              </h4>
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={order.product.image || "/placeholder.svg"}
                                    alt={order.product.name}
                                    className="w-12 h-12 object-cover rounded"
                                  />
                                  <div className="flex-1">
                                    <p className="font-medium text-sm">{order.product.name}</p>
                                    <p className="text-sm text-gray-600">
                                      {order.product.price.toLocaleString()} دينار جزائري
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-100">
                            {order.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => updateOrderStatus(order.id, "confirmed")}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                >
                                  <CheckCircle className="w-4 h-4 ml-1" />
                                  تأكيد الطلب
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateOrderStatus(order.id, "cancelled")}
                                >
                                  <XCircle className="w-4 h-4 ml-1" />
                                  إلغاء الطلب
                                </Button>
                              </>
                            )}
                            {order.status === "confirmed" && (
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, "delivered")}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                <CheckCircle className="w-4 h-4 ml-1" />
                                تم التوصيل
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="bg-white">
                              <Eye className="w-4 h-4 ml-1" />
                              عرض التفاصيل
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-white"
                              onClick={() => (window.location.href = `tel:${order.customerPhone}`)}
                            >
                              <Phone className="w-4 h-4 ml-1" />
                              اتصال
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 ml-2" />
                    إحصائيات المبيعات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">الرسوم البيانية قيد التطوير</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 ml-2" />
                    تحليل الأداء
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span>معدل النمو الأسبوعي</span>
                      <span className="font-bold text-green-600">+{stats.weeklyGrowth}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span>متوسط قيمة الطلب</span>
                      <span className="font-bold text-blue-600">
                        {stats.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toLocaleString() : "0"} دج
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span>طلبات اليوم</span>
                      <span className="font-bold text-purple-600">{stats.todayOrders}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 ml-2" />
                  إدارة العملاء
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">إدارة العملاء قيد التطوير</p>
                  <p className="text-gray-400 text-sm mt-2">ستتمكن قريباً من إدارة بيانات العملاء وتاريخ طلباتهم</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
