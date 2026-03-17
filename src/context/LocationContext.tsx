"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

export type LocationValue = {
  address: string
  lat: number
  lon: number
}

type LocationContextValue = {
  location: LocationValue | null
  setLocation: (next: LocationValue | null) => void
}

const STORAGE_KEY = "shopnow.location.v1"

const LocationContext = createContext<LocationContextValue | null>(null)

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocationState] = useState<LocationValue | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as LocationValue
      if (
        parsed &&
        typeof parsed.address === "string" &&
        typeof parsed.lat === "number" &&
        typeof parsed.lon === "number"
      ) {
        setLocationState(parsed)
      }
    } catch {
      // ignore
    }
  }, [])

  const setLocation = (next: LocationValue | null) => {
    setLocationState(next)
    try {
      if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  const value = useMemo<LocationContextValue>(
    () => ({ location, setLocation }),
    [location]
  )

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const ctx = useContext(LocationContext)
  if (!ctx) throw new Error("useLocation must be used within LocationProvider")
  return ctx
}

