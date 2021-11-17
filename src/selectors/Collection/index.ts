import { StarlightClient } from '../../types'
import { CollectionSelector, ProxiedCollectionSelector } from './types'
import makeCollectionInstance from '../../instances/Collection'

export default function makeCollectionSelector(
  client: StarlightClient
): ProxiedCollectionSelector {
  const selector: CollectionSelector = {
    list(options) {
      return client.get('/collections', options)
    },

    get(slug) {
      return client.get(`/collections/${slug}`)
    },
  }

  return new Proxy(selector, {
    get(target, prop) {
      if (typeof prop === 'string' && !Reflect.has(target, prop)) {
        return makeCollectionInstance(client, prop)
      }

      return Reflect.get(target, prop)
    },
  }) as ProxiedCollectionSelector
}

export { CollectionSelector, ProxiedCollectionSelector }
