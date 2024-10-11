// composables/useMobileValidator.ts

/**
 * Validates an Egyptian mobile number against a specific regex pattern.
 *
 * @param mobileNumber - The mobile number to validate.
 * @returns boolean indicating if the mobile number is valid.
 */
export default function useMobileValidator(
  mobileNumber: string,
  type?: 'mobile' | 'landLine'
): string {
  // Regex to validate Egyptian mobile numbers: Starts with 01, followed by 0, 1, 2, 5, and 8 more digits
  const mobileRegex: RegExp = /^01[0125][0-9]{8}$/
  const landLineRegex: RegExp = /^(02\d{8}|0\d{2,3}\d{7})$/
  const activeRegex = type === 'mobile' ? mobileRegex : landLineRegex

  // Test the mobile number against the regex pattern.
  return !mobileNumber?.length
    ? 'The phone number is required'
    : activeRegex.test(mobileNumber)
      ? ''
      : 'Invalid phone number'
}
