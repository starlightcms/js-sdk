import {
  ListRequestParameters,
  Entry,
  ModelCategory,
  QueryableFields,
  QueryableRequestParameters,
  SerializedData,
  StarlightItemResponse,
  StarlightListResponse,
  BaseRequestParameters,
} from '../../types'

/**
 * Request parameters for listing category entries.
 *
 * Used by {@apilink ModelCategoryInstance.entries}.
 *
 * @group Request Parameters
 */
export interface ModelCategoryEntryListParams
  extends ListRequestParameters, QueryableRequestParameters {
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
 * An Instance that provide methods to request information from a
 * {@link ModelCategory} and its {@apilink Entry | Entries}.
 *
 * You can access a ModelCategoryInstance using
 * {@apilink ModelInstance.category} or using the dynamic syntax on a
 * {@link DynamicModelInstance}. Usage examples will use the dynamic syntax.
 *
 * To list all categories from a model, use a {@link ModelCategorySelector}.
 *
 * @group Instances
 */
export interface ModelCategoryInstance<D extends SerializedData> {
  /**
   * Returns a {@link StarlightItemResponse} with a single {@link ModelCategory}.
   *
   * @example Requesting information from a category called "articles" in a model of slug "posts".
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.posts.articles.get()
   * ```
   *
   * @param params An optional object of request parameters.
   * @param options An optional object of fetch options. See
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit} for
   * more info.
   */
  get(
    params?: BaseRequestParameters,
    options?: RequestInit,
  ): Promise<StarlightItemResponse<ModelCategory>>

  /**
   * Returns a {@link StarlightListResponse} with the list of entries of this
   * {@link ModelCategory}.
   *
   * @example Requesting all items from a category called "gaming" in a model of slug "posts".
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.posts.gaming.items()
   * ```
   *
   * @example Paginating and searching on the last example.
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.posts.gaming.items({
   *   page: 5,
   *   query: 'kirby'
   * })
   * ```
   *
   * @param params An optional object of request parameters. See
   * {@link ModelCategoryEntryListParams} for all available parameters.
   * `field:foo` syntax is also supported, see {@link QueryableFields}
   * for more info.
   * @param options An optional object of fetch options. See
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit} for
   * more info.
   */
  entries(
    params?: ModelCategoryEntryListParams & QueryableFields<D>,
    options?: RequestInit,
  ): Promise<StarlightListResponse<Entry<D>>>
}
