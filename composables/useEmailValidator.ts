// composables/useEmailValidator.ts

/**
 * Validates an email address against a basic regex pattern.
 *
 * @param email - The email address to validate.
 * @returns boolean indicating if the email is valid.
 */
export default function useEmailValidator(email: string): string {
  // Basic email regex pattern for demonstration purposes.
  const emailRegex: RegExp = /^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/

  // Test the email against the regex pattern.
  return !email?.length
    ? 'The email is required'
    : emailRegex.test(email)
      ? ''
      : 'Invalid email address'
}
