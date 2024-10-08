// composables/usePasswordValidator.ts

/**
 * Validates a password based on defined rules: minimum 8 characters, must contain
 * letters and numbers, and at least one special character.
 *
 * @param password - The password to validate.
 * @returns boolean indicating if the password meets the requirements.
 */
export default function usePasswordValidator(
  password: string,
  key: 'login' | 'register'
): string {
  if (key === 'login') {
    return !password.length
      ? 'The Password is required'
      : password.length < 8
        ? 'The Password is too short'
        : ''
  }
  // Regex that checks for minimum eight characters, at least one letter, one number, and one special character
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

  return !password?.length
    ? 'The password is required'
    : passwordRegex.test(password)
      ? ''
      : 'Password should contain at least one letter, one number, and one special character'
}
