import {
  ListRequestParameters,
  Entry,
  SerializedData,
  StarlightListResponse,
} from '../../types'

/**
 * Request parameters for searching entries.
 *
 * Used by {@apilink SearchSelector.entries}.
 *
 * @group Request Parameters
 */
export interface SearchEntriesParams extends ListRequestParameters {
  /**
   * A comma-separated list of models. Only entries in these models
   * will be returned. If undefined, entries from all
   * workspace models will be listed.
   *
   * For instance, to show only entries in the "posts" and "videos" categories,
   * pass `'posts,videos'`.
   */
  models?: string
  /**
   * A comma-separated list of categories. Only entries in these categories
   * will be returned. If undefined, all entries will be listed, independently
   * of their categories.
   *
   * For instance, to show only entries in the "news" and "articles" categories,
   * pass `'news,category'`.
   */
  categories?: string
  /**
   * Define how items will be ordered. Check this field type to see the
   * allowed options.
   */
  order?:
    | 'title:asc'
    | 'title:desc'
    | 'published_at:asc'
    | 'published_at:desc'
    | 'updated_at:asc'
    | 'updated_at:desc'
  /**
   * If defined, removes the given item from the list. Useful to create "related
   * posts" lists.
   *
   * Note: this field only accepts IDs, and not slugs. Only one ID is allowed.
   */
  except?: number
}

/**
 * A Selector that provide methods to search for content. Only entry search
 * is supported for the time being.
 *
 * You can use a SearchSelector by accessing
 * {@apilink StarlightClient.search}.
 *
 * @group Selectors
 */
export interface SearchSelector {
  /**
   * Returns a {@link StarlightListResponse} with a list of
   * {@apilink Entry | Entries}. By default, entries from all models are
   * returned, but filtering by model can be configured.
   *
   * @example Listing all entries in all workspace models.
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.search.entries()
   * ```
   *
   * @example Searching for "hello world" within all entries in all workspace models.
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.search.entries({
   *   query: 'hello world'
   * })
   * ```
   *
   * @example Filtering the last example within specific models.
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.search.entries({
   *   query: 'hello world',
   *   models: 'posts,videos,magazines'
   * })
   * ```
   *
   * @param params An optional object of request parameters. See
   * {@link SearchEntriesParams} for all available parameters.
   * @param options An optional object of fetch options. See
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit} for
   * more info.
   */
  entries<T extends SerializedData = Record<string, unknown>>(
    params?: SearchEntriesParams,
    options?: RequestInit,
  ): Promise<StarlightListResponse<Entry<T>>>
}
