import {
  Entry,
  SerializedData,
  StarlightClient,
  StarlightListResponse,
} from '../../types'
import { SearchEntriesParams, SearchSelectorInterface } from './types'

export class SearchSelector implements SearchSelectorInterface {
  client: StarlightClient

  constructor(client: StarlightClient) {
    this.client = client
  }

  entries<T extends SerializedData = Record<string, unknown>>(
    options?: SearchEntriesParams
  ): Promise<StarlightListResponse<Entry<T>>> {
    return this.client.get('/search/entries', { ...options })
  }
}

export { SearchSelectorInterface, SearchEntriesParams }
