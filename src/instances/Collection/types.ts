import {
  Collection,
  CollectionTypes,
  ModelFieldOptions,
  SerializedData,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'

export type ListCollectionItemsOptions<T> = {
  page?: number
  limit?: number
  query?: string
  'query:word'?: string
  fields?: string
  order?:
    | 'title:asc'
    | 'title:desc'
    | 'published_at:asc'
    | 'published_at:desc'
    | 'views:asc'
    | 'views:desc'
  except?: number
} & (T extends SerializedData ? ModelFieldOptions<T> : unknown)

export interface CollectionInstance<C extends CollectionTypes = string> {
  get(): Promise<StarlightItemResponse<Collection<C>>>
  items<T>(
    options?: ListCollectionItemsOptions<T>
  ): Promise<StarlightListResponse<T>>
}
