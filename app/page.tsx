import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Truck,
  Headphones,
  Award,
  Users,
  Phone,
  Clock,
  CreditCard,
  Package,
  Sparkles,
  Zap,
  Star,
  Heart,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"

const featuredProducts = products.slice(0, 4)

const features = [
  {
    icon: Truck,
    title: "توصيل مجاني",
    description: "توصيل مجاني للطلبات أكثر من 6,500 دينار",
    color: "from-emerald-500 via-teal-500 to-cyan-500",
    bgColor: "from-emerald-50 to-teal-50",
  },
  {
    icon: CreditCard,
    title: "الدفع عند الاستلام",
    description: "ادفع عند وصول طلبك بكل أمان",
    color: "from-blue-500 via-indigo-500 to-purple-500",
    bgColor: "from-blue-50 to-indigo-50",
  },
  {
    icon: Headphones,
    title: "دعم على مدار الساعة",
    description: "خدمة عملاء متاحة 24/7",
    color: "from-purple-500 via-pink-500 to-rose-500",
    bgColor: "from-purple-50 to-pink-50",
  },
]

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "عميل سعيد",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50",
  },
  {
    icon: Award,
    value: "99%",
    label: "معدل الرضا",
    color: "from-emerald-500 to-green-500",
    bgColor: "from-emerald-50 to-green-50",
  },
  {
    icon: Clock,
    value: "24ساعة",
    label: "توصيل سريع",
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50 to-red-50",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 arabic-text">
      <Header />

      {/* Ultra Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-indigo-700/20" />

        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-xl animate-pulse float-animation" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-xl animate-pulse float-animation"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full blur-xl animate-pulse float-animation"
          style={{ animationDelay: "4s" }}
        />

        {/* Morphing Background Shape */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-blue-500 morphing-shape" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Floating Badge */}
            <div className="mb-8 flex justify-center">
              <Badge className="bg-white/80 backdrop-blur-sm text-purple-700 border-purple-200/50 px-6 py-3 text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-md">
                <Sparkles className="w-5 h-5 mr-2" />🎉 مجموعة جديدة متاحة الآن
              </Badge>
            </div>

            {/* Main Heading with Gradient */}
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="gradient-text-rainbow">اكتشف منتجات</span>
              <br />
              <span className="gradient-text-purple">مذهلة</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl md:text-3xl mb-12 text-gray-600 max-w-4xl mx-auto leading-relaxed">
              تسوق أحدث الأجهزة التقنية والإكسسوارات والمزيد بأسعار لا تُقاوم وتوصيل سريع كالبرق.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button size="lg" className="btn-modern text-xl px-12 py-6 shadow-2xl hover:shadow-purple-500/25" asChild>
                <Link href="/products">
                  <Zap className="w-6 h-6 mr-3" />
                  تسوق الآن
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-white/80 backdrop-blur-sm text-purple-700 hover:bg-white/90 text-xl px-12 py-6 border-purple-200/50 hover:border-purple-300/50 transition-all duration-300 shadow-md"
              >
                <Phone className="w-6 h-6 mr-3" />
                <span className="hidden sm:inline">اتصل بنا: </span>
                <span dir="ltr">0774525109</span>
              </Button>
            </div>

            {/* Floating Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl hover:scale-105 transition-all duration-500 group shadow-md"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold gradient-text-purple mb-2">{stat.value}</div>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ultra Modern Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-blue-50/50" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text-purple">لماذا تختار اشرقت؟</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نحن ملتزمون بتوفير أفضل تجربة تسوق ممكنة لك مع أحدث التقنيات والخدمات المتميزة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative modern-card" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="modern-card p-8 text-center h-full relative overflow-hidden">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Icon */}
                  <div className="relative z-10">
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <feature.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 gradient-text-purple">{feature.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra Modern Featured Products */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-white/80 backdrop-blur-sm text-purple-700 border-purple-200/50 px-4 py-2 mb-6 shadow-md">
              <Star className="w-4 h-4 mr-2" />
              منتجات مختارة بعناية
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text-purple">المنتجات المميزة</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اكتشف مجموعتنا المختارة بعناية من أفضل المنتجات مع عروض مذهلة ومفضلات العملاء.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-white/80 backdrop-blur-sm text-purple-700 hover:bg-white/90 text-xl px-12 py-6 border-purple-200/50 hover:border-purple-300/50 transition-all duration-300 hover:scale-105 shadow-md"
              asChild
            >
              <Link href="/products">
                <Package className="w-6 h-6 mr-3" />
                عرض جميع المنتجات
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ultra Modern COD Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600" />
        <div className="absolute inset-0 bg-black/10" />

        {/* Floating Shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center text-white">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-3xl mb-8 hover:scale-110 transition-transform duration-300 border border-white/20 shadow-lg">
              <CreditCard className="w-12 h-12" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">الدفع عند الاستلام</h2>
            <p className="text-xl sm:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
              تسوق بثقة! ادفع فقط عند وصول طلبك إلى باب منزلك. لا حاجة لبطاقات ائتمان أو دفع مسبق.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              {[
                { icon: Package, title: "اطلب", desc: "اختر منتجاتك واطلبها مباشرة" },
                { icon: Truck, title: "نوصل", desc: "نوصل طلبك خلال 24-48 ساعة" },
                { icon: CreditCard, title: "ادفع", desc: "ادفع نقداً عند الاستلام" },
              ].map((step, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 group border border-white/20 shadow-lg"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <step.icon className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="opacity-90">{step.desc}</p>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 text-xl px-12 py-6 shadow-2xl hover:shadow-white/25 hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link href="/products">
                <Heart className="w-6 h-6 mr-3" />
                ابدأ التسوق الآن
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ultra Modern Newsletter Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600" />
        <div className="absolute inset-0 bg-black/10" />

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-gradient-x" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="bg-white/10 backdrop-blur-sm text-white border-white/20 px-6 py-3 mb-8 text-lg shadow-md">
              <Sparkles className="w-5 h-5 mr-2" />
              انضم لعائلة اشرقت
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">ابق على اطلاع</h2>
            <p className="text-xl sm:text-2xl mb-12 opacity-90">
              اشترك في نشرتنا الإخبارية للحصول على عروض حصرية وإعلانات المنتجات الجديدة ونصائح تقنية.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
              <Input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="modern-input flex-1 text-lg py-4 text-gray-900 placeholder:text-gray-500"
              />
              <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-xl hover:shadow-white/25 hover:scale-105 transition-all duration-300">
                <Zap className="w-5 h-5 mr-2" />
                اشترك
              </Button>
            </div>

            <p className="text-sm opacity-75">🔒 نحترم خصوصيتك ولن نشارك بياناتك مع أي طرف ثالث</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
