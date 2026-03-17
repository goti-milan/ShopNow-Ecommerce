export type GeocodeResult = {
  placeId: string
  displayName: string
  lat: number
  lon: number
}

export async function searchPlaces(query: string, signal?: AbortSignal) {
  const q = query.trim()
  if (!q) return [] as GeocodeResult[]

  const url = new URL("https://nominatim.openstreetmap.org/search")
  url.searchParams.set("q", q)
  url.searchParams.set("format", "json")
  url.searchParams.set("addressdetails", "1")
  url.searchParams.set("limit", "6")

  const res = await fetch(url.toString(), {
    signal,
    headers: { "Accept": "application/json" },
  })
  if (!res.ok) return []
  const data = (await res.json()) as Array<{
    place_id: number | string
    display_name: string
    lat: string
    lon: string
  }>

  return data.map((item) => ({
    placeId: String(item.place_id),
    displayName: item.display_name,
    lat: Number.parseFloat(item.lat),
    lon: Number.parseFloat(item.lon),
  }))
}

export async function reverseGeocode(lat: number, lon: number, signal?: AbortSignal) {
  const url = new URL("https://nominatim.openstreetmap.org/reverse")
  url.searchParams.set("lat", String(lat))
  url.searchParams.set("lon", String(lon))
  url.searchParams.set("format", "json")
  url.searchParams.set("zoom", "18")
  url.searchParams.set("addressdetails", "1")

  const res = await fetch(url.toString(), {
    signal,
    headers: { "Accept": "application/json" },
  })
  if (!res.ok) return null
  const data = (await res.json()) as { display_name?: string }
  return data.display_name ?? null
}

