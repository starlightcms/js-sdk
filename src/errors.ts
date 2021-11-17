export class StarlightError extends Error {
  public response: Response

  constructor(message: string, response: Response) {
    super(message)
    this.response = response
  }
}
