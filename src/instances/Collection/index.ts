import { StarlightClient } from '../../types'
import { CollectionInstance } from './types'

export default function makeCollectionInstance(
  client: StarlightClient,
  collection: string
): CollectionInstance {
  return {
    get() {
      return client.get(`/collections/${collection}`)
    },

    items(options) {
      return client.get(`/collections/${collection}/items`, options)
    },
  }
}

export { CollectionInstance }
