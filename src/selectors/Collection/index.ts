import {
  Collection,
  StarlightClient,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'
import {
  CollectionSelectorInterface,
  DynamicCollectionSelector,
  ListCollectionsParams,
} from './types'
import { CollectionInstance } from '../../instances/Collection'

export class CollectionSelector implements CollectionSelectorInterface {
  client: StarlightClient

  constructor(client: StarlightClient) {
    this.client = client
  }

  list(
    options?: ListCollectionsParams
  ): Promise<StarlightListResponse<Collection>> {
    return this.client.get('/collections', { ...options })
  }

  get(slug: string | number): Promise<StarlightItemResponse<Collection>> {
    return this.client.get(`/collections/${slug}`)
  }
}

export function makeDynamicCollectionSelector(
  client: StarlightClient
): DynamicCollectionSelector {
  const selector = new CollectionSelector(client)

  return new Proxy(selector, {
    get(target, prop) {
      if (typeof prop === 'string' && !Reflect.has(target, prop)) {
        return new CollectionInstance(client, prop)
      }

      return Reflect.get(target, prop)
    },
  }) as unknown as DynamicCollectionSelector
}

export { DynamicCollectionSelector, ListCollectionsParams }
