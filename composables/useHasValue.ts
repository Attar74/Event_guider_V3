// composables/useHasValue.ts

/**
 * Checks if the provided value has a "value" based on the type.
 *
 * @param value - The value to check.
 * @returns boolean indicating if the provided value has a value.
 */
export default function useHasValue<T>(value: T): boolean {
  if (value === null || value === undefined) return false

  if (value && [Object, Array].includes(value.constructor)) {
    const values = Object.values(value)
    return !!values.length && values.some(useHasValue)
  } else if (typeof value === 'string') {
    return !!value.replace(/\s+/g, '').length
  } else if (typeof value === 'boolean') {
    return [true, false].includes(value)
  } else if ([null, undefined].includes(value)) {
    return false
  }
  return !!value
}
