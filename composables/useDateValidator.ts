export default function useDateValidator(date: string): string {
  // Check if the date string is empty
  if (!date.length) return 'The date is required'

  // Regular expression to match both "YYYY-MM-DD" and "YYYY-MM-DDTHH:MM:SS" formats
  const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?$/

  // Check if the date string matches the expected format
  if (!dateRegex.test(date)) return 'Invalid date format'

  // Parse the date string with JavaScript Date object
  const parsedDate = new Date(date)

  // Check if the parsed date is valid (invalid dates will return NaN)
  if (isNaN(parsedDate.getTime())) return 'Invalid date'

  // Additional check to ensure the date is exactly as input (avoids cases like "2024-13-01" becoming valid)
  const [year, month, day] = date.split('T')[0].split('-').map(Number)
  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() + 1 !== month ||
    parsedDate.getDate() !== day
  ) {
    return 'Invalid date'
  }

  return '' // Valid date
}
