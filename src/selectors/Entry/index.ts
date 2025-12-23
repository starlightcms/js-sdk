import { SerializedData, StarlightClient } from '../../types'
import { EntrySelector, ListEntriesParams } from './types'

export default function makeEntrySelector<D extends SerializedData>(
  client: StarlightClient,
  model: string,
): EntrySelector<D> {
  return {
    list(params, options) {
      return client.get(`/models/${model}/entries`, params, options)
    },

    get(slug, params, options) {
      return client.get(`/models/${model}/entries/${slug}`, params, options)
    },
  }
}

export { EntrySelector, ListEntriesParams }
