import {
  Entry,
  SerializedData,
  StarlightClient,
  StarlightItemResponse,
  StarlightListResponse,
} from '../types'

export default class EntrySelector<D extends SerializedData = undefined> {
  protected model: string
  protected client: StarlightClient

  constructor(model: string, client: StarlightClient) {
    this.model = model
    this.client = client
  }

  public async list(): Promise<StarlightListResponse<Entry<D>>> {
    return this.client.get(`/models/${this.model}/entries`)
  }

  public async get(slug: string): Promise<Entry<D>> {
    const response: StarlightItemResponse<Entry<D>> = await this.client.get(
      `/models/${this.model}/entries/${slug}`
    )

    return response.data
  }
}
