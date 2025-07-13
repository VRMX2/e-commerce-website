"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error saving to localStorage:`, error)
    }
  }

  // Get from local storage then parse stored json or return initialValue
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key)
        if (item) {
          setStoredValue(JSON.parse(item))
        }
      }
    } catch (error) {
      console.error(`Error reading from localStorage:`, error)
      setStoredValue(initialValue)
    }
  }, [key, initialValue])

  return [storedValue, setValue] as const
}

// Hook for managing multiple localStorage keys
export function useLocalStorageState() {
  const getItem = <T,>(key: string, defaultValue: T): T => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : defaultValue
      }
      return defaultValue
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error)
      return defaultValue
    }
  }

  const setItem = <T,>(key: string, value: T): void => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  const removeItem = (key: string): void => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error)
    }
  }

  const clear = (): void => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.clear()
      }
    } catch (error) {
      console.error(`Error clearing localStorage:`, error)
    }
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  }
}
