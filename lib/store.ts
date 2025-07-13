"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  rating: number
  reviews: number
  category: string
  badge?: string
  description: string
  features: string[]
  specifications: Record<string, string>
  inStock: boolean
}

export interface CartItem extends Product {
  quantity: number
}

interface StoreState {
  // Cart
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartItemsCount: () => number

  // Wishlist
  wishlist: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean

  // Search & Filters
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedPriceRange: string[]
  setSelectedPriceRange: (ranges: string[]) => void
  sortBy: string
  setSortBy: (sort: string) => void

  // Add admin notification system to the store:
  adminNotifications: Array<{
    id: string
    type: "order" | "customer" | "system"
    title: string
    message: string
    data?: any
    read: boolean
    createdAt: Date
  }>
  addAdminNotification: (notification: Omit<StoreState["adminNotifications"][0], "id" | "createdAt">) => void
  markNotificationAsRead: (id: string) => void
  clearNotifications: () => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],
      addToCart: (product, quantity = 1) => {
        const existingItem = get().cart.find((item) => item.id === product.id)
        if (existingItem) {
          set((state) => ({
            cart: state.cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
            ),
          }))
        } else {
          set((state) => ({
            cart: [...state.cart, { ...product, quantity }],
          }))
        }
      },
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }))
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
          return
        }
        set((state) => ({
          cart: state.cart.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        }))
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      getCartItemsCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0)
      },

      // Wishlist state
      wishlist: [],
      addToWishlist: (product) => {
        set((state) => ({
          wishlist: [...state.wishlist, product],
        }))
      },
      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        }))
      },
      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item.id === productId)
      },

      // Search & Filter state
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
      selectedCategory: "All",
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      selectedPriceRange: [],
      setSelectedPriceRange: (ranges) => set({ selectedPriceRange: ranges }),
      sortBy: "featured",
      setSortBy: (sort) => set({ sortBy: sort }),

      // Add admin notification system to the store:
      adminNotifications: [],
      addAdminNotification: (notification) => {
        const newNotification = {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
        }
        set((state) => ({
          adminNotifications: [newNotification, ...state.adminNotifications],
        }))
      },
      markNotificationAsRead: (id) => {
        set((state) => ({
          adminNotifications: state.adminNotifications.map((notif) =>
            notif.id === id ? { ...notif, read: true } : notif,
          ),
        }))
      },
      clearNotifications: () => set({ adminNotifications: [] }),
    }),
    {
      name: "ecommerce-store",
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
      }),
    },
  ),
)
