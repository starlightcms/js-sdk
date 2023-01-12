import {
  Entry,
  SerializedData,
  StarlightClient,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'
import { EntrySelector, ListEntriesParams } from './types'

export default function makeEntrySelector<D extends SerializedData>(
  client: StarlightClient,
  model: string
): EntrySelector<D> {
  return {
    list(options): Promise<StarlightListResponse<Entry<D>>> {
      return client.get(`/models/${model}/entries`, options)
    },

    get(
      slug: string,
      params,
      options
    ): Promise<StarlightItemResponse<Entry<D>>> {
      return client.get(`/models/${model}/entries/${slug}`, params, options)
    },
  }
}

export { EntrySelector, ListEntriesParams }
