import {
  Entry,
  QueryableFields,
  SerializedData,
  StarlightClient,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'
import {
  EntrySelectorInterface,
  GetEntryParams,
  ListEntriesParams,
} from './types'

export class EntrySelector<D extends SerializedData>
  implements EntrySelectorInterface<D>
{
  client: StarlightClient
  model: string

  constructor(client: StarlightClient, model: string) {
    this.client = client
    this.model = model
  }

  list(
    options?: ListEntriesParams & QueryableFields<D>
  ): Promise<StarlightListResponse<Entry<D>>> {
    return this.client.get(`/models/${this.model}/entries`, options)
  }

  get(
    slug: string,
    params?: GetEntryParams,
    options?: RequestInit
  ): Promise<StarlightItemResponse<Entry<D>>> {
    return this.client.get(
      `/models/${this.model}/entries/${slug}`,
      params,
      options
    )
  }
}

export { EntrySelectorInterface, ListEntriesParams }
