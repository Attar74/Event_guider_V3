export function useBuildQueryString() {
  const buildQueryString = (
    obj: Record<string, any>,
    prefix: string = '?'
  ): string => {
    const queryStringParts: string[] = []

    const buildPart = (key: string, value: any) => {
      if (value === null || value === undefined) {
        queryStringParts.push(`${encodeURIComponent(key)}=`)
      } else if (value instanceof Date) {
        // Handle Date objects by converting them to ISO strings
        queryStringParts.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(value.toISOString())}`
        )
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        // Recursively handle nested objects
        for (const subKey in value) {
          if (Object.prototype.hasOwnProperty.call(value, subKey)) {
            buildPart(`${key}[${subKey}]`, value[subKey])
          }
        }
      } else if (Array.isArray(value)) {
        // Handle arrays
        value.forEach(item => {
          queryStringParts.push(
            `${encodeURIComponent(key)}[]=${encodeURIComponent(item)}`
          )
        })
      } else {
        // Handle primitive values
        queryStringParts.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
      }
    }

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        buildPart(key, obj[key])
      }
    }

    return prefix + queryStringParts.join('&')
  }

  return { buildQueryString }
}
