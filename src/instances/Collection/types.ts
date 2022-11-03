import {
  BaseRequestParameters,
  Collection,
  CollectionEntityTypes,
  CollectionTypeMapper,
  QueryableRequestParameters,
  StarlightItemResponse,
  StarlightListResponse,
  WithQueryableFieldsOnModelables,
} from '../../types'

/**
 * Request parameters for listing collection items.
 *
 * Used by {@apilink CollectionInstance.items}.
 *
 * @group Request Parameters
 */
export interface ListCollectionItemsParams
  extends BaseRequestParameters,
    QueryableRequestParameters {
  /**
   * Define how entries will be ordered. Check this field type to see the
   * allowed options.
   */
  order?:
    | 'title:asc'
    | 'title:desc'
    | 'published_at:asc'
    | 'published_at:desc'
    | 'views:asc'
    | 'views:desc'
}

/**
 * An Instance that provide methods to request information and items from
 * a specific {@link Collection}.
 *
 * You can access a CollectionInstance using
 * {@apilink StarlightClient.collection}.
 *
 * To list all workspace collections, use a {@link CollectionSelector}.
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
   * Returns a {@link StarlightListResponse} with the list of items of this
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
   * @param options An optional object of request parameters. See
   * {@link ListCollectionItemsParams} for all available options. `field:foo`
   * syntax is also supported, see {@link QueryableFields} for more info.
   */
  items(
    options?: ListCollectionItemsParams | WithQueryableFieldsOnModelables<C>
  ): Promise<StarlightListResponse<C>>
}
