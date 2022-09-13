import {
  Collection,
  CollectionEntityTypes,
  CollectionTypeMapper,
  Entry,
  ModelFieldOptions,
  Singleton,
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
} & (T extends Entry<never> | Singleton<never>
  ? ModelFieldOptions<Pick<T, 'data'>>
  : Record<string, never>)

/**
 * An Instance that provide methods to request information and items from
 * {@apilink Collection | Collections}.
 *
 * @group Instances
 */
export interface CollectionInstance<C extends CollectionEntityTypes> {
  /**
   * Returns a {@link StarlightItemResponse} with a single {@link Collection}.
   *
   * @example Requesting information from a collection of slug `featured-news`.
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.collection('featured-news').get()
   * ```
   */
  get(): Promise<StarlightItemResponse<Collection<CollectionTypeMapper<C>>>>

  /**
   * Returns a {@link StarlightListResponse} with the list of items of the given
   * {@link Collection}. The returned list type depends on the collection type:
   * a list of {@apilink Entry | Entries} for a collection of type `entry`, a
   * list of {@apilink MediaObject | MediaObjects} for a collection o type
   * `media`, and so on.
   *
   * If the given Collection is not typed, this method will return a response of
   * `StarlightListResponse<unknown>`.
   *
   * @example Requesting all items from an Entry collection of slug `featured-news`.
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.collection('featured-news').items()
   * ```
   *
   * @example Explicitly typing the returned items. Only possible in TypeScript.
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   * import { NewsPostType } from '../types'
   *
   * // response will be StarlightListResponse<Entry<NewsPostType>>
   * const response = await Starlight.collection<Entry<NewsPostType>>('featured-news').items()
   * ```
   *
   * @param options
   */
  items(
    options?: ListCollectionItemsOptions<C>
  ): Promise<StarlightListResponse<C>>
}
