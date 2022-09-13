import { CollectionEntityTypes, StarlightClient } from '../../types'
import { CollectionInstance } from './types'

export default function makeCollectionInstance<
  T extends CollectionEntityTypes = unknown
>(client: StarlightClient, collection: string | number): CollectionInstance<T> {
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
