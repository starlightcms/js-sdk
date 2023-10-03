import {
  Collection,
  CollectionEntityTypes,
  CollectionTypeMapper,
  StarlightClient,
  StarlightItemResponse,
  StarlightListResponse,
  WithQueryableFieldsOnModelables,
} from '../../types'
import { CollectionInstanceInterface, ListCollectionItemsParams } from './types'

export class CollectionInstance<
  CollectionType extends CollectionEntityTypes = unknown
> implements CollectionInstanceInterface<CollectionType>
{
  client: StarlightClient
  collection: string

  constructor(client: StarlightClient, collection: string) {
    this.client = client
    this.collection = collection
  }

  get(): Promise<
    StarlightItemResponse<Collection<CollectionTypeMapper<CollectionType>>>
  > {
    return this.client.get(`/collections/${this.collection}`)
  }

  items(
    options?:
      | ListCollectionItemsParams
      | WithQueryableFieldsOnModelables<CollectionType>
  ): Promise<StarlightListResponse<CollectionType>> {
    return this.client.get(`/collections/${this.collection}/items`, options)
  }
}

export { CollectionInstanceInterface, ListCollectionItemsParams }
