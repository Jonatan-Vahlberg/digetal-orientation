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
