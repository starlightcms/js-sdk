import type { StarlightClient } from '../../types'
import type {
  CollectionSelector,
  DynamicCollectionSelector,
  ListCollectionsParams,
} from './types'
import makeCollectionInstance from '../../instances/Collection'

export default function makeCollectionSelector(
  client: StarlightClient,
): DynamicCollectionSelector {
  const selector: CollectionSelector = {
    list(params, options) {
      return client.get('/collections', params, options)
    },

    get(slug, params, options) {
      return client.get(`/collections/${slug}`, params, options)
    },
  }

  return new Proxy(selector, {
    get(target, prop) {
      if (typeof prop === 'string' && !Reflect.has(target, prop)) {
        return makeCollectionInstance(client, prop)
      }

      return Reflect.get(target, prop)
    },
  }) as DynamicCollectionSelector
}

export { CollectionSelector, DynamicCollectionSelector, ListCollectionsParams }
