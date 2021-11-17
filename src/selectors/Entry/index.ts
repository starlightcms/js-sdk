import {
  Entry,
  SerializedData,
  StarlightClient,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'
import { EntrySelector } from './types'

export default function makeEntrySelector<D extends SerializedData>(
  client: StarlightClient,
  model: string
): EntrySelector<D> {
  return {
    list(options): Promise<StarlightListResponse<Entry<D>>> {
      return client.get(`/models/${model}/entries`, options)
    },

    get(slug: string): Promise<StarlightItemResponse<Entry<D>>> {
      return client.get(`/models/${model}/entries/${slug}`)
    },
  }
}

export { EntrySelector }
