/**
 * This error is thrown every time a problem occurs when requesting something
 * from Starlight's APIs. When it does, you can inspect the attached response
 * to verify what kind of problem happened and handle it accordingly.
 *
 * @group Errors
 */
export class StarlightError extends Error {
  /**
   * The response provided by the `fetch` method when the error occurred.
   *
   * @example Using the `response` property to handle 404 errors.
   *
   * ```ts
   * import Starlight, { StarlightError } from '@starlightcms/js-sdk'
   *
   * // Returns either an Entry, null on 404 errors, or false in all other cases
   * const requestEntry = async (slug) => {
   *   try {
   *     const response = await Starlight.posts.entries.get(slug)
   *
   *     return response.data
   *   } catch (error) {
   *     if (error instanceof StarlightError && error.response.status === 404) {
   *       // Return null to indicate a 404 error
   *       return null
   *     }
   *
   *     // Return false in all other error scenarios
   *     return false
   *   }
   * }
   * ```
   *
   * @see [MDN documentation on the Response object](https://developer.mozilla.org/en-US/docs/Web/API/Response)
   */
  public response: Response

  constructor(message: string, response: Response) {
    super(message)
    this.response = response
  }
}
