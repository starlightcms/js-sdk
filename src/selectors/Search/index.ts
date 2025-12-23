import { StarlightClient } from '../../types'
import { SearchEntriesParams, SearchSelector } from './types'

export default function makeSearchSelector(
  client: StarlightClient,
): SearchSelector {
  return {
    entries(params, options) {
      return client.get('/search/entries', params, options)
    },
  }
}

export { SearchSelector, SearchEntriesParams }
