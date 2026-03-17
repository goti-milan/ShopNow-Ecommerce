const TILE_SIZE = 256

export function latLonToGlobalPixels(lat: number, lon: number, zoom: number) {
  const clampedLat = Math.max(-85.05112878, Math.min(85.05112878, lat))
  const clampedLon = ((lon + 180) % 360 + 360) % 360 - 180

  const sinLat = Math.sin((clampedLat * Math.PI) / 180)
  const n = 2 ** zoom

  const x = ((clampedLon + 180) / 360) * n * TILE_SIZE
  const y =
    (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) *
    n *
    TILE_SIZE

  return { x, y }
}

export function globalPixelsToLatLon(x: number, y: number, zoom: number) {
  const n = 2 ** zoom
  const lon = (x / (n * TILE_SIZE)) * 360 - 180
  const latRad = Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / (n * TILE_SIZE))))
  const lat = (latRad * 180) / Math.PI
  return { lat, lon }
}

