import { CollectionTypes, StarlightClient } from '../../types'
import { CollectionInstance } from './types'

export default function makeCollectionInstance<
  T extends CollectionTypes = string
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
