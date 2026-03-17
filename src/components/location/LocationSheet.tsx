"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { MapPin, Navigation, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import StaticMapPicker from "@/components/location/StaticMapPicker"
import { reverseGeocode, searchPlaces, type GeocodeResult } from "@/lib/geocode"
import { useLocation, type LocationValue } from "@/context/LocationContext"

type Props = {
  trigger: import("react").ReactNode
}

const DEFAULT_CENTER = { lat: 40.7128, lon: -74.006 } // NYC

function formatShortAddress(full: string) {
  const parts = full.split(",").map((p) => p.trim()).filter(Boolean)
  return parts.slice(0, 2).join(", ") || full
}

export default function LocationSheet({ trigger }: Props) {
  const { location, setLocation } = useLocation()
  const [open, setOpen] = useState(false)

  const initial = useMemo(() => {
    if (location) return { lat: location.lat, lon: location.lon, address: location.address }
    return { lat: DEFAULT_CENTER.lat, lon: DEFAULT_CENTER.lon, address: "" }
  }, [location])

  const [zoom, setZoom] = useState(13)
  const [center, setCenter] = useState<{ lat: number; lon: number }>({ lat: initial.lat, lon: initial.lon })
  const [marker, setMarker] = useState<{ lat: number; lon: number } | null>({ lat: initial.lat, lon: initial.lon })
  const [address, setAddress] = useState(initial.address)
  const [results, setResults] = useState<GeocodeResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchAbortRef = useRef<AbortController | null>(null)
  const reverseAbortRef = useRef<AbortController | null>(null)
  const debounceRef = useRef<number | null>(null)

  useEffect(() => {
    if (!open) return
    setError(null)
    setResults([])
    setLoading(false)
    setZoom(13)

    if (location) {
      setCenter({ lat: location.lat, lon: location.lon })
      setMarker({ lat: location.lat, lon: location.lon })
      setAddress(location.address)
    } else {
      setCenter(DEFAULT_CENTER)
      setMarker(DEFAULT_CENTER)
      setAddress("")
    }
  }, [open, location])

  const applyLocation = (next: LocationValue) => {
    setLocation(next)
    setOpen(false)
  }

  const handlePickFromMap = async (lat: number, lon: number) => {
    setError(null)
    setMarker({ lat, lon })
    setCenter({ lat, lon })

    reverseAbortRef.current?.abort()
    const ac = new AbortController()
    reverseAbortRef.current = ac
    try {
      setLoading(true)
      const name = await reverseGeocode(lat, lon, ac.signal)
      if (name) setAddress(name)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  const runSearch = (q: string) => {
    searchAbortRef.current?.abort()
    const ac = new AbortController()
    searchAbortRef.current = ac

    setLoading(true)
    setError(null)
    searchPlaces(q, ac.signal)
      .then((items) => setResults(items))
      .catch(() => setResults([]))
      .finally(() => setLoading(false))
  }

  const handleAddressChange = (value: string) => {
    setAddress(value)
    setError(null)
    if (debounceRef.current) window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(() => {
      const q = value.trim()
      if (q.length < 3) {
        setResults([])
        return
      }
      runSearch(q)
    }, 350)
  }

  const handleSelectResult = async (item: GeocodeResult) => {
    setAddress(item.displayName)
    setResults([])
    setError(null)
    setMarker({ lat: item.lat, lon: item.lon })
    setCenter({ lat: item.lat, lon: item.lon })
  }

  const resolveAddressToMarker = async (q: string) => {
    const query = q.trim()
    if (query.length < 3) return
    searchAbortRef.current?.abort()
    const ac = new AbortController()
    searchAbortRef.current = ac
    try {
      setLoading(true)
      setError(null)
      const items = await searchPlaces(query, ac.signal)
      setResults(items)
      if (items[0]) await handleSelectResult(items[0])
      else setError("No results found for that address.")
    } catch {
      setError("Search failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleUseCurrentLocation = () => {
    setError(null)
    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser.")
      return
    }
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        await handlePickFromMap(lat, lon)
        setLoading(false)
      },
      () => {
        setLoading(false)
        setError("Unable to get your current location.")
      },
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  const canSave = Boolean(marker) && address.trim().length > 0

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-3xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Choose delivery location
          </SheetTitle>
          <SheetDescription>
            Pick from the map or search an address. Map selection and input stay in sync.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-3">
            <StaticMapPicker
              center={center}
              marker={marker}
              zoom={zoom}
              onPick={handlePickFromMap}
            />

            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setZoom((z) => Math.max(3, z - 1))}>
                  –
                </Button>
                <Button variant="outline" size="sm" onClick={() => setZoom((z) => Math.min(18, z + 1))}>
                  +
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={handleUseCurrentLocation}>
                <Navigation className="h-4 w-4" />
                Use current
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={address}
                onChange={(e) => handleAddressChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    void resolveAddressToMarker(address)
                  }
                }}
                placeholder="Search address, area, landmark..."
                className="pl-10 pr-10"
              />
              {address && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setAddress("")
                    setResults([])
                    setError(null)
                  }}
                  aria-label="Clear address"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {error && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-foreground">
                {error}
              </div>
            )}

            <div className="rounded-xl border border-border bg-background p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Suggestions</p>
                {loading && <p className="text-xs text-muted-foreground">Loading…</p>}
              </div>

              <div className="max-h-60 space-y-2 overflow-y-auto">
                {results.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Type 3+ characters to search, or click on the map to pick a place.
                  </p>
                ) : (
                  results.map((item) => (
                    <button
                      key={item.placeId}
                      type="button"
                      className="w-full rounded-lg border border-border px-3 py-2 text-left text-sm hover:bg-muted"
                      onClick={() => handleSelectResult(item)}
                    >
                      {item.displayName}
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <p className="text-xs font-semibold text-muted-foreground">Selected</p>
              <p className="mt-1 text-sm text-foreground">
                {address ? formatShortAddress(address) : "No address selected yet"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {marker ? `${marker.lat.toFixed(5)}, ${marker.lon.toFixed(5)}` : "—"}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                disabled={!canSave}
                onClick={() => {
                  if (!marker) return
                  const next: LocationValue = {
                    address: address.trim(),
                    lat: marker.lat,
                    lon: marker.lon,
                  }
                  applyLocation(next)
                }}
              >
                Save location
              </Button>
              <Button
                variant="outline"
                disabled={address.trim().length < 3}
                onClick={() => void resolveAddressToMarker(address)}
              >
                Set on map
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setLocation(null)
                  setOpen(false)
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
