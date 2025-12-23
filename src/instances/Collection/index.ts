import { CollectionEntityTypes, StarlightClient } from '../../types'
import { CollectionInstance, ListCollectionItemsParams } from './types'

export default function makeCollectionInstance<
  T extends CollectionEntityTypes = unknown,
>(client: StarlightClient, collection: string | number): CollectionInstance<T> {
  return {
    get(params, options) {
      return client.get(`/collections/${collection}`, params, options)
    },

    items(params, options) {
      return client.get(`/collections/${collection}/items`, params, options)
    },
  }
}

export { CollectionInstance, ListCollectionItemsParams }
