"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { User, Menu, Package, Settings, LogOut, Phone, Search } from "lucide-react"
import { WishlistSheet } from "@/components/wishlist-sheet"
import { SearchBar } from "@/components/search-bar"
import { ErrorBoundary } from "@/components/error-boundary"
import { useRouter } from "next/navigation"
import { logout } from "@/app/actions/auth"

export function Header({ user }: { user: any }) {
  const [mounted, setMounted] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCallClick = () => {
    window.location.href = "tel:0774525109"
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:lehcengrissi@gmail.com"
  }

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 space-x-reverse">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent arabic-text">
                اشرقت
              </span>
            </Link>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <ErrorBoundary>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Top Bar - Hidden on small mobile */}
        <div className="hidden sm:block bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-2">
              <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                <button onClick={handleCallClick} className="hover:underline flex items-center">
                  📞 للطلب: 0774525109
                </button>
                <span>🚚 توصيل مجاني للطلبات أكثر من 6,500 دينار</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span>💰 الدفع عند الاستلام متاح</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 space-x-reverse">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent arabic-text">
                  اشرقت
                </span>
                <span className="hidden sm:block text-xs text-gray-500">متجر الإلكترونيات</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
              <Link href="/" className="text-sm font-medium hover:text-purple-600 transition-colors arabic-text">
                الرئيسية
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium hover:text-purple-600 transition-colors arabic-text"
              >
                المنتجات
              </Link>
              <Link
                href="/categories"
                className="text-sm font-medium hover:text-purple-600 transition-colors arabic-text"
              >
                الأقسام
              </Link>
              <Link href="/deals" className="text-sm font-medium hover:text-purple-600 transition-colors arabic-text">
                العروض
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-purple-600 transition-colors arabic-text">
                من نحن
              </Link>
            </nav>

            {/* Desktop Search Bar */}
            <SearchBar className="hidden xl:flex flex-1 max-w-sm mx-8" placeholder="ابحث عن المنتجات..." />

            {/* Right Side Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2 space-x-reverse">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="xl:hidden w-9 h-9 sm:w-10 sm:h-10"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>

              {/* Contact Button - Desktop only */}
              <Button
                variant="outline"
                size="sm"
                className="hidden lg:flex items-center space-x-1 space-x-reverse bg-transparent hover:bg-purple-50"
                onClick={handleCallClick}
              >
                <Phone className="w-4 h-4" />
                <span className="arabic-text">اتصل بنا</span>
              </Button>

              {/* Wishlist */}
              <div className="hidden sm:block">
                <WishlistSheet />
              </div>

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-9 h-9 sm:w-10 sm:h-10">
                      <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="arabic-text" onClick={() => router.push("/profile")}>
                      <User className="w-4 h-4 ml-2" />
                      الملف الشخصي
                    </DropdownMenuItem>
                    <DropdownMenuItem className="arabic-text" onClick={() => router.push("/orders")}>
                      <Package className="w-4 h-4 ml-2" />
                      طلباتي
                    </DropdownMenuItem>
                    {user?.isAdmin && (
                      <DropdownMenuItem className="arabic-text" onClick={() => router.push("/admin")}>
                        <Settings className="w-4 h-4 ml-2" />
                        لوحة التحكم
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="arabic-text"
                      onClick={async () => {
                        await logout()
                        router.push("/login")
                      }}
                    >
                      <LogOut className="w-4 h-4 ml-2" />
                      تسجيل الخروج
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden md:flex items-center space-x-2 space-x-reverse">
                  <Button variant="ghost" size="sm" asChild className="arabic-text text-xs sm:text-sm">
                    <Link href="/login">تسجيل الدخول</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 arabic-text text-xs sm:text-sm"
                    asChild
                  >
                    <Link href="/signup">إنشاء حساب</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden w-9 h-9 sm:w-10 sm:h-10">
                    <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="flex flex-col space-y-6 mt-8 arabic-text">
                    {/* Mobile Contact Info */}
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">تواصل معنا</h3>
                      <button
                        onClick={handleCallClick}
                        className="flex items-center space-x-2 space-x-reverse text-sm text-purple-700 hover:text-purple-900 mb-1"
                      >
                        <Phone className="w-4 h-4" />
                        <span>0774525109</span>
                      </button>
                      <button
                        onClick={handleEmailClick}
                        className="flex items-center space-x-2 space-x-reverse text-sm text-purple-700 hover:text-purple-900"
                      >
                        <span>lehcengrissi@gmail.com</span>
                      </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-4">
                      <Link href="/" className="text-lg font-medium block py-2 hover:text-purple-600">
                        الرئيسية
                      </Link>
                      <Link href="/products" className="text-lg font-medium block py-2 hover:text-purple-600">
                        المنتجات
                      </Link>
                      <Link href="/categories" className="text-lg font-medium block py-2 hover:text-purple-600">
                        الأقسام
                      </Link>
                      <Link href="/deals" className="text-lg font-medium block py-2 hover:text-purple-600">
                        العروض
                      </Link>
                      <Link href="/about" className="text-lg font-medium block py-2 hover:text-purple-600">
                        من نحن
                      </Link>
                      <Link href="/contact" className="text-lg font-medium block py-2 hover:text-purple-600">
                        اتصل بنا
                      </Link>
                    </div>

                    {/* Mobile Wishlist */}
                    <div className="sm:hidden">
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <Link href="/wishlist">قائمة الأمنيات</Link>
                      </Button>
                    </div>

                    {/* Auth Buttons */}
                    <div className="pt-4 border-t">
                      {!user && (
                        <div className="flex flex-col space-y-3">
                          <Button variant="outline" asChild className="arabic-text bg-transparent">
                            <Link href="/login">تسجيل الدخول</Link>
                          </Button>
                          <Button asChild className="arabic-text">
                            <Link href="/signup">إنشاء حساب</Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showMobileSearch && (
            <div className="xl:hidden pb-4">
              <SearchBar className="w-full" placeholder="ابحث عن المنتجات..." />
            </div>
          )}
        </div>
      </header>
    </ErrorBoundary>
  )
}
