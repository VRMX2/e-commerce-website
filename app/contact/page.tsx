"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate sending message
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "تم إرسال رسالتك بنجاح! 📧",
      description: "سنتواصل معك خلال 24 ساعة على lehcengrissi@gmail.com",
    })

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
    setIsLoading(false)
  }

  const handleCallClick = () => {
    window.location.href = "tel:0774525109"
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:lehcengrissi@gmail.com"
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "اتصل بنا",
      details: ["0774525109"],
      description: "متاح 24/7",
      action: handleCallClick,
    },
    {
      icon: Mail,
      title: "راسلنا",
      details: ["lehcengrissi@gmail.com"],
      description: "نرد خلال ساعة",
      action: handleEmailClick,
    },
    {
      icon: MapPin,
      title: "زورنا",
      details: ["الرياض، المملكة العربية السعودية"],
      description: "مفتوح من 9 صباحاً - 9 مساءً",
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      details: ["السبت - الخميس: 9:00 - 21:00", "الجمعة: 14:00 - 21:00"],
      description: "خدمة العملاء متاحة دائماً",
    },
  ]

  return (
    <div className="min-h-screen bg-background arabic-text">
      <Header />

      {/* Hero Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">تواصل معنا</h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto">
            نحن هنا لمساعدتك! تواصل معنا في أي وقت وسنكون سعداء للإجابة على جميع استفساراتك
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-bold flex items-center">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
                  أرسل لنا رسالة
                </CardTitle>
                <p className="text-gray-600">املأ النموذج وسنتواصل معك قريباً</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">الاسم الكامل *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="أدخل اسمك الكامل"
                        className="h-12"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="05xxxxxxxx"
                        dir="ltr"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">البريد الإلكتروني *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="أدخل بريدك الإلكتروني"
                      className="h-12"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">الموضوع *</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="موضوع الرسالة"
                      className="h-12"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">الرسالة *</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="اكتب رسالتك هنا..."
                      rows={5}
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full h-12" size="lg" disabled={isLoading}>
                    {isLoading ? (
                      "جاري الإرسال..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 ml-2" />
                        إرسال الرسالة
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">معلومات التواصل</h2>
              <p className="text-gray-600 mb-6 sm:mb-8">
                يمكنك التواصل معنا بأي من الطرق التالية، ونحن ملتزمون بالرد عليك في أسرع وقت ممكن.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className={`hover:shadow-lg transition-shadow border-0 shadow-md ${info.action ? "cursor-pointer" : ""}`}
                  onClick={info.action}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4 space-x-reverse">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                          <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                        <div className="space-y-1 mb-2">
                          {info.details.map((detail, idx) => (
                            <p
                              key={idx}
                              className="text-gray-700 text-sm sm:text-base"
                              dir={info.icon === Phone ? "ltr" : "auto"}
                            >
                              {detail}
                            </p>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold text-lg mb-4">تحتاج مساعدة فورية؟</h3>
                <div className="space-y-3">
                  <Button
                    className="w-full bg-white/20 hover:bg-white/30 border-white/30 h-12"
                    variant="outline"
                    onClick={handleCallClick}
                  >
                    <Phone className="w-4 h-4 ml-2" />
                    اتصل الآن: 0774525109
                  </Button>
                  <Button
                    className="w-full bg-white/20 hover:bg-white/30 border-white/30 h-12"
                    variant="outline"
                    onClick={handleEmailClick}
                  >
                    <MessageCircle className="w-4 h-4 ml-2" />
                    راسلنا: lehcengrissi@gmail.com
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 sm:mt-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">الأسئلة الشائعة</h2>
            <p className="text-gray-600">إجابات سريعة على أكثر الأسئلة شيوعاً</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                question: "كم يستغرق التوصيل؟",
                answer: "نوصل خلال 24-48 ساعة داخل المدن الرئيسية، و3-5 أيام للمناطق الأخرى.",
              },
              {
                question: "هل يمكنني إرجاع المنتج؟",
                answer: "نعم، يمكنك إرجاع المنتج خلال 30 يوم من تاريخ الشراء.",
              },
              {
                question: "هل التوصيل مجاني؟",
                answer: "التوصيل مجاني للطلبات أكثر من 150 ريال، وإلا فالرسوم 25 ريال.",
              },
              {
                question: "كيف يمكنني تتبع طلبي؟",
                answer: "سنرسل لك رسالة نصية برقم التتبع فور شحن طلبك.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">{faq.question}</h4>
                  <p className="text-gray-600 text-sm sm:text-base">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
