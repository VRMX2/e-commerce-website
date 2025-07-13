"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Eye, Lock, Database } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
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
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4">سياسة الخصوصية</h1>
            <p className="text-gray-600 text-lg">آخر تحديث: ديسمبر 2024</p>
          </div>

          <div className="space-y-8">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 ml-2" />
                  مقدمة
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>
                  نحن في اشرقت نقدر خصوصيتك ونلتزم بحماية معلوماتك الشخصية. هذه السياسة توضح كيفية جمع واستخدام وحماية
                  بياناتك.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 ml-2" />
                  المعلومات التي نجمعها
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>نجمع المعلومات التالية:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>معلومات شخصية:</strong> الاسم، البريد الإلكتروني، رقم الهاتف، العنوان
                  </li>
                  <li>
                    <strong>معلومات الطلبات:</strong> تاريخ الطلبات، المنتجات المشتراة، طرق الدفع
                  </li>
                  <li>
                    <strong>معلومات تقنية:</strong> عنوان IP، نوع المتصفح، نظام التشغيل
                  </li>
                  <li>
                    <strong>ملفات تعريف الارتباط:</strong> لتحسين تجربة التصفح
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>كيف نستخدم معلوماتك</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>نستخدم معلوماتك للأغراض التالية:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>معالجة وتنفيذ طلباتك</li>
                  <li>التواصل معك بخصوص طلباتك</li>
                  <li>تحسين خدماتنا ومنتجاتنا</li>
                  <li>إرسال عروض وتحديثات (بموافقتك)</li>
                  <li>منع الاحتيال وضمان الأمان</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 ml-2" />
                  حماية معلوماتك
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>نتخذ إجراءات أمنية صارمة لحماية معلوماتك:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>تشفير البيانات الحساسة</li>
                  <li>خوادم آمنة ومحمية</li>
                  <li>وصول محدود للموظفين المخولين فقط</li>
                  <li>مراقبة مستمرة للأنشطة المشبوهة</li>
                  <li>نسخ احتياطية منتظمة</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>مشاركة المعلومات</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلومات محدودة مع:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>شركات الشحن لتوصيل طلباتك</li>
                  <li>معالجات الدفع لتنفيذ المعاملات</li>
                  <li>مقدمي الخدمات التقنية لصيانة الموقع</li>
                  <li>السلطات القانونية عند الضرورة</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>حقوقك</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>لديك الحقوق التالية فيما يتعلق بمعلوماتك:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>الوصول إلى معلوماتك الشخصية</li>
                  <li>تصحيح المعلومات غير الصحيحة</li>
                  <li>حذف معلوماتك (في ظروف معينة)</li>
                  <li>إيقاف معالجة معلوماتك</li>
                  <li>نقل معلوماتك إلى خدمة أخرى</li>
                  <li>الاعتراض على استخدام معلوماتك</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>ملفات تعريف الارتباط</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>نستخدم ملفات تعريف الارتباط لتحسين تجربتك:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>ملفات أساسية:</strong> ضرورية لعمل الموقع
                  </li>
                  <li>
                    <strong>ملفات الأداء:</strong> لتحليل استخدام الموقع
                  </li>
                  <li>
                    <strong>ملفات الوظائف:</strong> لحفظ تفضيلاتك
                  </li>
                  <li>
                    <strong>ملفات التسويق:</strong> لعرض إعلانات مناسبة
                  </li>
                </ul>
                <p>يمكنك إدارة ملفات تعريف الارتباط من إعدادات متصفحك.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>الاحتفاظ بالبيانات</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>
                  نحتفظ بمعلوماتك طالما كان حسابك نشطاً أو حسب الحاجة لتقديم الخدمات. قد نحتفظ ببعض المعلومات لفترة أطول
                  للامتثال للقوانين أو حل النزاعات.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>التغييرات على هذه السياسة</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>
                  قد نحدث هذه السياسة من وقت لآخر. سنخطرك بأي تغييرات مهمة عبر البريد الإلكتروني أو إشعار على موقعنا.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>التواصل معنا</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none arabic-text">
                <p>إذا كان لديك أي أسئلة حول سياسة الخصوصية أو ترغب في ممارسة حقوقك، يرجى التواصل معنا:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>البريد الإلكتروني: privacy@ashraqat.com</li>
                  <li>الهاتف: 966501234567+</li>
                  <li>العنوان: الرياض، المملكة العربية السعودية</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">نحن ملتزمون بحماية خصوصيتك وضمان أمان معلوماتك</p>
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
