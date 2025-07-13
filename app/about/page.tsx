"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Users, Award, Truck, Shield, Heart, Star, Phone, Mail } from "lucide-react"
import Link from "next/link"

const stats = [
  { icon: Users, value: "50,000+", label: "عميل سعيد" },
  { icon: Award, value: "99%", label: "معدل الرضا" },
  { icon: Truck, value: "24 ساعة", label: "توصيل سريع" },
  { icon: Shield, value: "100%", label: "ضمان الجودة" },
]

const values = [
  {
    icon: Heart,
    title: "شغف بالتميز",
    description: "نحن ملتزمون بتقديم أفضل المنتجات والخدمات لعملائنا الكرام",
  },
  {
    icon: Shield,
    title: "الثقة والأمان",
    description: "نضمن لك تجربة تسوق آمنة ومضمونة مع حماية كاملة لبياناتك",
  },
  {
    icon: Star,
    title: "الجودة العالية",
    description: "نختار منتجاتنا بعناية فائقة لضمان حصولك على أفضل جودة",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background arabic-text">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">🌟 قصتنا</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">من نحن</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            نحن فريق شغوف بالتكنولوجيا، نسعى لتوفير أحدث الأجهزة التقنية والإكسسوارات بأفضل الأسعار وأعلى مستويات الخدمة
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">قصة اشرقت</h2>
              <p className="text-gray-600 text-lg">رحلتنا نحو التميز في عالم التجارة الإلكترونية</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">رؤيتنا ورسالتنا</h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    بدأت اشرقت كحلم بسيط: جعل التكنولوجيا المتقدمة في متناول الجميع. نؤمن بأن كل شخص يستحق الوصول إلى
                    أحدث الأجهزة التقنية بأسعار عادلة وخدمة استثنائية.
                  </p>
                  <p>
                    منذ تأسيسنا، نسعى لبناء جسر من الثقة بيننا وبين عملائنا من خلال تقديم منتجات عالية الجودة، وخدمة
                    عملاء متميزة، وتجربة تسوق سهلة وآمنة.
                  </p>
                  <p>
                    نحن لسنا مجرد متجر إلكتروني، بل شريك موثوق في رحلتك التقنية. نختار كل منتج بعناية فائقة ونضمن لك
                    الحصول على أفضل قيمة مقابل أموالك.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img src="/placeholder.svg?height=400&width=500" alt="فريق اشرقت" className="rounded-xl shadow-lg" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">قيمنا الأساسية</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">هذه هي المبادئ التي توجه كل ما نقوم به في اشرقت</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6">
                    <value.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">فريق العمل</h2>
            <p className="text-gray-600">تعرف على الأشخاص الذين يجعلون اشرقت مميزة</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "أحمد محمد", role: "المؤسس والرئيس التنفيذي", image: "/placeholder.svg?height=300&width=300" },
              { name: "فاطمة علي", role: "مديرة التسويق", image: "/placeholder.svg?height=300&width=300" },
              { name: "محمد سالم", role: "مدير التقنية", image: "/placeholder.svg?height=300&width=300" },
            ].map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardContent className="p-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">هل لديك أسئلة؟</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            نحن هنا للمساعدة! تواصل معنا في أي وقت وسنكون سعداء للإجابة على استفساراتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
              <Link href="/contact">
                <Mail className="w-5 h-5 ml-2" />
                تواصل معنا
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
            >
              <Phone className="w-5 h-5 ml-2" />
              اتصل بنا: 966501234567+
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
