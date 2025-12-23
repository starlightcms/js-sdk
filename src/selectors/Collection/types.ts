import {
  ListRequestParameters,
  Collection,
  StarlightItemResponse,
  StarlightListResponse,
  BaseRequestParameters,
} from '../../types'
import { CollectionInstance } from '../../instances/Collection'

/**
 * Request parameters for listing collections.
 *
 * Used by {@apilink CollectionSelector.list}.
 *
 * @group Request Parameters
 */
export interface ListCollectionsParams extends ListRequestParameters {
  /**
   * Define how items will be ordered. Check this field type to see the
   * allowed options.
   */
  order?: 'title:asc' | 'title:desc' | 'item_count:asc' | 'item_count:desc'
}

/**
 * A Selector that provide methods to list and request information on
 * {@apilink Collection | Collections}.
 *
 * You can use a CollectionSelector by accessing
 * {@apilink StarlightClient.collections}.
 *
 * To get items from a specific collection, use a {@link CollectionInstance}.
 *
 * @group Selectors
 */
export interface CollectionSelector {
  /**
   * Returns a {@link StarlightListResponse} with the list of
   * {@apilink Collection | Collections} in this workspace.
   *
   * @example Requesting all collections from the workspace.
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.collections.list()
   * ```
   *
   * @example Paginating and searching on the last example.
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.collections.list({
   *   page: 2,
   *   query: 'photos',
   * })
   * ```
   *
   * @param params An optional object of request parameters. See
   * {@link ListCollectionsParams} for all available parameters.
   * @param options An optional object of fetch options. See
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit} for
   * more info.
   */
  list(
    params?: ListCollectionsParams,
    options?: RequestInit,
  ): Promise<StarlightListResponse<Collection>>

  /**
   * Returns a {@link StarlightItemResponse} with a single {@link Collection}.
   *
   * @example Requesting information from a collection of slug "event-photos".
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.collections.get('event-photos')
   * ```
   *
   * @param slug The collection slug.
   * @param params An optional object of request parameters.
   * @param options An optional object of fetch options. See
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit} for
   * more info.
   */
  get(
    slug: string | number,
    params?: BaseRequestParameters,
    options?: RequestInit,
  ): Promise<StarlightItemResponse<Collection>>
}

/**
 * A Selector that provide all {@link CollectionSelector} methods and adds
 * support for creating {@apilink CollectionInstance | CollectionInstances}
 * using the dynamic syntax.
 *
 * See {@link CollectionSelector} to view all available methods.
 *
 * See {@doclink requests-and-responses#dynamic-syntax | Dynamic Instances}
 * documentation to learn more about the dynamic syntax.
 *
 * @example Accessing a CollectionInstance using the dynamic syntax.
 * ```ts
 * import Starlight from '@starlightcms/js-sdk'
 *
 * // "sliders" below will be a CollectionInstance.
 * const response = await Starlight.collections.sliders.list()
 * ```
 *
 * @category Instances
 */
export type DynamicCollectionSelector = CollectionSelector & {
  [key: string]: CollectionInstance<unknown>
}
