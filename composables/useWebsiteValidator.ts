export default function useValidateUrl(url: string): string {
  // The regex for a valid website URL that can start with http, https, or www.
  const urlRegex: RegExp =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/

  /**
   * Function to validate the website URL
   * @param {string} url - The URL to validate
   * @returns {boolean} - Returns true if valid, otherwise false
   */
  return !url.length
    ? 'The Website URL is required'
    : urlRegex.test(url)
      ? ''
      : 'Invalid URL'
}
