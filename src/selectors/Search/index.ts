import {
  Entry,
  SerializedData,
  StarlightClient,
  StarlightListResponse,
} from '../../types'
import { SearchEntriesOptions, SearchSelector } from './types'

export default function makeSearchSelector(
  client: StarlightClient
): SearchSelector {
  return {
    entries<T extends SerializedData = Record<string, unknown>>(
      options: SearchEntriesOptions
    ): Promise<StarlightListResponse<Entry<T>>> {
      return client.get('/search/entries', options)
    },
  }
}

export { SearchSelector }
