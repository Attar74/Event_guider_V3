// composables/usePasswordConfirmation.ts

/**
 * Checks if the password and the confirmation password are identical.
 *
 * @param password - The main password.
 * @param confirmPassword - The password confirmation to validate against the main password.
 * @returns string - A message indicating whether the passwords match or not.
 */
export default function usePasswordConfirmation(
  confirmPassword: string,
  password: string
): string {
  if (!confirmPassword.length) {
    return 'Please confirm your password.'
  } else if (password === confirmPassword) {
    return ''
  } else {
    return 'Passwords do not match.'
  }
}
