"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useActionState } from "react"
import { login } from "@/app/actions/auth"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const [state, formAction, isPending] = useActionState(login, null)

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "تم تسجيل الدخول بنجاح! 🎉",
        description: state.isAdmin ? "مرحباً بك في لوحة الإدارة!" : "مرحباً بك مرة أخرى",
      })
      router.push(state.isAdmin ? "/admin" : "/")
    } else if (state?.error) {
      toast({
        title: "خطأ في تسجيل الدخول",
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
              <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
              <p className="text-gray-600">أدخل بياناتك للوصول إلى حسابك</p>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input type="email" name="email" placeholder="أدخل بريدك الإلكتروني" className="pr-10" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">كلمة المرور</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox id="remember" name="rememberMe" />
                    <label htmlFor="remember" className="text-sm">
                      تذكرني
                    </label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                  {isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  ليس لديك حساب؟{" "}
                  <Link href="/signup" className="text-purple-600 hover:text-purple-700 font-medium">
                    إنشاء حساب جديد
                  </Link>
                </p>
              </div>

              {/* Admin Demo Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">🔑 معلومات تجريبية للإدارة</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>
                    <strong>البريد:</strong> lehcengrissi@gmail.com
                  </p>
                  <p>
                    <strong>كلمة المرور:</strong> admin123
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
