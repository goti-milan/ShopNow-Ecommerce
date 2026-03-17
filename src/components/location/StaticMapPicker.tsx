"use client"

import Image from "next/image"
import { useMemo, useRef } from "react"
import { globalPixelsToLatLon, latLonToGlobalPixels } from "@/lib/mercator"
import { cn } from "@/lib/utils"

type Props = {
  center: { lat: number; lon: number }
  zoom: number
  marker?: { lat: number; lon: number } | null
  size?: { width: number; height: number }
  onPick: (lat: number, lon: number) => void
  className?: string
}

export default function StaticMapPicker({
  center,
  zoom,
  marker,
  size = { width: 760, height: 440 },
  onPick,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const mapUrl = useMemo(() => {
    const url = new URL("https://staticmap.openstreetmap.de/staticmap.php")
    url.searchParams.set("center", `${center.lat},${center.lon}`)
    url.searchParams.set("zoom", String(zoom))
    url.searchParams.set("size", `${size.width}x${size.height}`)
    if (marker) {
      url.searchParams.set("markers", `${marker.lat},${marker.lon},red-pushpin`)
    }
    return url.toString()
  }, [center.lat, center.lon, zoom, size.width, size.height, marker])

  const handleClick = (e: React.MouseEvent) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top

    const centerPx = latLonToGlobalPixels(center.lat, center.lon, zoom)
    const clickedGlobalX = centerPx.x + (px - rect.width / 2)
    const clickedGlobalY = centerPx.y + (py - rect.height / 2)
    const { lat, lon } = globalPixelsToLatLon(clickedGlobalX, clickedGlobalY, zoom)

    onPick(lat, lon)
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-border bg-muted",
        className
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Pick location from map"
    >
      <div className="relative aspect-[19/11] w-full">
        <Image
          src={mapUrl}
          alt="Map"
          fill
          sizes="(min-width: 1024px) 760px, 100vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="pointer-events-none absolute left-3 top-3 rounded-lg bg-background/80 px-2 py-1 text-xs text-muted-foreground backdrop-blur">
        Click map to select
      </div>
    </div>
  )
}

