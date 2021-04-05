export const capitalize = (string: string) => {
  return string.length >= 2
    ? string[0].toUpperCase() + string.substr(1)
    : string.length === 1
    ? string[0].toUpperCase()
    : ''
}

export const capitalizeAll = (string: string) => {
  let parts = string.split(' ')
  parts = parts.map((part) =>
    part.length >= 2
      ? part[0].toUpperCase() + part.substr(1)
      : part.length === 1
      ? part[0].toUpperCase()
      : ''
  )
  return parts.join(' ')
}

const square = (x: number) => Math.pow(x, 2)
const degToRad = (deg: number) => deg * (Math.PI / 180)

export const caluclateDistance = (position1: Vertex, position2: Vertex) => {
  const earthsRadius = 6371
  const latitude1 = degToRad(position1.lat)
  const latitude2 = degToRad(position2.lat)
  const latitudeDiff = Math.abs(latitude1 - latitude2)
  const longitudeDiff = degToRad(Math.abs(position1.lng - position2.lng))
  const a =
    square(Math.sin(latitudeDiff / 2)) +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      square(Math.sin(longitudeDiff / 2))
  const d = 2 * earthsRadius * Math.asin(Math.sqrt(a))
  console.log('FIELD DISTANCE ', d, d * 1000)
  return d * 1000
}
