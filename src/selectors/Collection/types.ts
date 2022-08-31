import {
  Collection,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'
import { CollectionInstance } from '../../instances/Collection'

export type ListCollectionsOptions = {
  query?: string
  page?: number
  limit?: number
  order?: 'title:asc' | 'title:desc' | 'item_count:asc' | 'item_count:desc'
}

export interface CollectionSelector {
  list(
    options?: ListCollectionsOptions
  ): Promise<StarlightListResponse<Collection>>
  get(slug: string | number): Promise<StarlightItemResponse<Collection>>
}

export type ProxiedCollectionSelector = CollectionSelector & {
  [key: string]: CollectionInstance
}
