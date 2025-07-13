"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background arabic-text">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" className="mb-6" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 ml-2" />
              العودة للرئيسية
            </Link>
          </Button>

          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4">شروط الخدمة</h1>
            <p className="text-gray-600 text-lg">آخر تحديث: ديسمبر 2024</p>
          </div>

          <div className="space-y-8">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 ml-2" />
                  مقدمة
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>
                  مرحباً بك في اشرقت. هذه الشروط والأحكام تحكم استخدامك لموقعنا الإلكتروني وخدماتنا. باستخدام موقعنا،
                  فإنك توافق على هذه الشروط بالكامل.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>1. قبول الشروط</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>
                  بوصولك إلى هذا الموقع واستخدامه، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذا الاتفاق. إذا كنت لا
                  توافق على أي من هذه الشروط، فيجب عليك عدم استخدام هذا الموقع.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>2. استخدام الموقع</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>
                  يُسمح لك باستخدام موقعنا للأغراض الشخصية والتجارية المشروعة فقط. يُمنع استخدام الموقع لأي أغراض غير
                  قانونية أو محظورة.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>عدم انتهاك حقوق الملكية الفكرية</li>
                  <li>عدم نشر محتوى ضار أو مسيء</li>
                  <li>عدم محاولة اختراق أو إلحاق الضرر بالموقع</li>
                  <li>عدم استخدام الموقع لأنشطة احتيالية</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>3. المنتجات والأسعار</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>
                  نحن نسعى لضمان دقة المعلومات المتعلقة بالمنتجات والأسعار، ولكن قد تحدث أخطاء. نحتفظ بالحق في تصحيح أي
                  أخطاء وتحديث المعلومات دون إشعار مسبق.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>4. الطلبات والدفع</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>
                  عند تقديم طلب، فإنك تقدم عرضاً لشراء المنتج. جميع الطلبات تخضع للقبول من جانبنا. نحتفظ بالحق في رفض أي
                  طلب لأي سبب.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>الدفع عند الاستلام متاح</li>
                  <li>جميع الأسعار بالريال السعودي</li>
                  <li>قد تطبق رسوم توصيل إضافية</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>5. التوصيل والإرجاع</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>
                  نسعى لتوصيل طلباتك في الوقت المحدد، ولكن قد تحدث تأخيرات خارجة عن سيطرتنا. يمكنك إرجاع المنتجات خلال
                  30 يوماً من تاريخ الاستلام.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>6. الضمان وإخلاء المسؤولية</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>
                  نقدم ضماناً محدوداً على منتجاتنا وفقاً لشروط الشركة المصنعة. لا نتحمل مسؤولية أي أضرار غير مباشرة أو
                  تبعية.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>7. تعديل الشروط</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>
                  نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر التعديلات على هذه الصفحة وستصبح سارية فور نشرها.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 ml-2" />
                  8. التواصل
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>إذا كان لديك أي أسئلة حول هذه الشروط، يرجى التواصل معنا:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>البريد الإلكتروني: info@ashraqat.com</li>
                  <li>الهاتف: 966501234567+</li>
                  <li>العنوان: الرياض، المملكة العربية السعودية</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">بالمتابعة في استخدام موقعنا، فإنك توافق على هذه الشروط والأحكام</p>
            <Button asChild>
              <Link href="/">العودة للتسوق</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
