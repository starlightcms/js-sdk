import {
  BaseRequestParameters,
  ModelCategory,
  SerializedData,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'
import { ModelCategoryInstance } from '../../instances/ModelCategory'

/**
 * Request parameters for listing model categories.
 *
 * Used by {@apilink ModelCategorySelector.list}.
 *
 * @group Request Parameters
 */
export interface ListModelCategoriesOptions extends BaseRequestParameters {
  /**
   * Define how items will be ordered. Check this field type to see the
   * allowed options.
   */
  order?:
    | 'title:asc'
    | 'title:desc'
    | 'entry_count:asc'
    | 'entry_count:desc'
    | 'slug:asc'
    | 'slug:desc'
    | 'created_at:asc'
    | 'created_at:desc'
    | 'updated_at:asc'
    | 'updated_at:desc'
}

/**
 * A Selector that provide methods to list and request information on
 * {@apilink ModelCategory | ModelCategories}.
 *
 * You can use a ModelCategorySelector by accessing
 * {@apilink ModelInstance.categories}.
 *
 * @group Selectors
 */
export interface ModelCategorySelector {
  /**
   * Returns a {@link StarlightListResponse} with a list of
   * {@apilink ModelCategory | ModelCategories}.
   *
   * @example Requesting all categories from a model.
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.posts.categories.list()
   * ```
   *
   * @param options An optional object of request parameters. See
   * {@link ListModelCategoriesOptions} for all available options.
   */
  list(
    options?: ListModelCategoriesOptions
  ): Promise<StarlightListResponse<ModelCategory>>

  /**
   * Returns a {@link StarlightItemResponse} with a single {@link ModelCategory}.
   *
   * @example Requesting information from a category "premium" from a model of slug "plans".
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.plans.premium.get()
   * ```
   *
   * @param slug The category slug.
   */
  get(slug: string): Promise<StarlightItemResponse<ModelCategory>>
}

/**
 * A Selector that provide all {@link ModelCategorySelector} methods and adds
 * support for creating {@apilink ModelCategoryInstance | ModelCategoryInstances}
 * using the dynamic syntax.
 *
 * See {@link ModelCategorySelector} to view all available methods. You can use
 * a DynamicModelCategorySelector by accessing {@apilink ModelInstance.categories}.
 *
 * See {@doclink requests-and-responses#dynamic-syntax | Dynamic Instances}
 * documentation to learn more about the dynamic syntax.
 *
 * @example Accessing a ModelCategorySelector using the dynamic syntax on a model of slug "posts"
 * ```ts
 * import Starlight from '@starlightcms/js-sdk'
 *
 * // "articles" below will be a ModelCategorySelector.
 * const response = await Starlight.posts.categories.articles.list()
 * ```
 *
 * @category Instances
 */
export type DynamicModelCategorySelector<D extends SerializedData> =
  ModelCategorySelector & {
    [slug: string]: ModelCategoryInstance<D>
  }
