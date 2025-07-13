import type React from "react"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/toaster"
import { getSession } from "@/lib/auth"

const cairo = Cairo({ subsets: ["arabic", "latin"] })

export const metadata: Metadata = {
  title: "اشرقت - متجر الإلكترونيات والأجهزة الذكية",
  description: "اكتشف أحدث الأجهزة التقنية والإلكترونيات والإكسسوارات بأفضل الأسعار والتوصيل السريع",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getSession()
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
