"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  className?: string
  placeholder?: string
}

export function SearchBar({ className, placeholder = "ابحث في المنتجات..." }: SearchBarProps) {
  const { searchQuery, setSearchQuery } = useStore()
  const [localQuery, setLocalQuery] = useState(searchQuery)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [localQuery, setSearchQuery])

  const handleClear = () => {
    setLocalQuery("")
    setSearchQuery("")
  }

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="pr-10 pl-10 h-10 arabic-text"
        dir="rtl"
      />
      {localQuery && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-1 top-1/2 transform -translate-y-1/2 w-8 h-8"
          onClick={handleClear}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}
