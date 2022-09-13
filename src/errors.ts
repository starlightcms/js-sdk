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
   * @see [MDN documentation on the Response object](https://developer.mozilla.org/en-US/docs/Web/API/Response)
   */
  public response: Response

  constructor(message: string, response: Response) {
    super(message)
    this.response = response
  }
}
