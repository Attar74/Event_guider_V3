export default function useComparisonNumber(
  value: string,
  comparsonedValud: string | number,
  key: string,
  comparsonedSign: string
): string {
  if (!value) {
    return `${key} is required`
  } else if (Number(value) <= 0) {
    return `${key} should be greater than 0`
  } else if (
    comparsonedSign === 'greaterThanOrEqual' &&
    comparsonedValud &&
    Number(value) >= Number(comparsonedValud)
  ) {
    return `${key} should be less than ${comparsonedValud}`
  } else if (
    comparsonedSign === 'lessThanOrEqual' &&
    comparsonedValud &&
    Number(value) <= Number(comparsonedValud)
  ) {
    return `${key} should be greater than ${comparsonedValud}`
  }
  return ''
}
