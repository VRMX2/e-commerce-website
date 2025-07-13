"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useActionState } from "react"
import { signup } from "@/app/actions/auth"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const [state, formAction, isPending] = useActionState(signup, null)

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "تم إنشاء الحساب بنجاح! 🎉",
        description: "مرحباً بك في اشرقت، يمكنك الآن البدء في التسوق",
      })
      router.push("/")
    } else if (state?.error) {
      toast({
        title: "خطأ في إنشاء الحساب",
        description: state.error,
        variant: "destructive",
      })
    }
  }, [state, router, toast])

  return (
    <div className="min-h-screen bg-background arabic-text">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <Button variant="ghost" className="mb-6" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 ml-2" />
              العودة للرئيسية
            </Link>
          </Button>

          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">إنشاء حساب جديد</CardTitle>
              <p className="text-gray-600">انضم إلى اشرقت واستمتع بتجربة تسوق مميزة</p>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="أدخل اسمك الكامل"
                      className="pr-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="أدخل بريدك الإلكتروني"
                      className="pr-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="05xxxxxxxx"
                      className="pr-10"
                      dir="ltr"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">كلمة المرور</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="أدخل كلمة المرور"
                      className="pr-10 pl-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute left-1 top-1/2 transform -translate-y-1/2 w-8 h-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">تأكيد كلمة المرور</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="أعد إدخال كلمة المرور"
                      className="pr-10 pl-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute left-1 top-1/2 transform -translate-y-1/2 w-8 h-8"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                  />
                  <label htmlFor="terms" className="text-sm">
                    أوافق على{" "}
                    <Link href="/terms" className="text-purple-600 hover:text-purple-700">
                      شروط الخدمة
                    </Link>{" "}
                    و{" "}
                    <Link href="/privacy" className="text-purple-600 hover:text-purple-700">
                      سياسة الخصوصية
                    </Link>
                  </label>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                  {isPending ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  لديك حساب بالفعل؟{" "}
                  <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                    تسجيل الدخول
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
