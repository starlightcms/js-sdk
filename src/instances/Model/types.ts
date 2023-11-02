import { Model, SerializedData, StarlightItemResponse } from '../../types'
import { EntrySelectorInterface } from '../../selectors/Entry'
import { DynamicModelCategorySelector } from '../../selectors/ModelCategory'
import { ModelCategoryInstanceInterface } from '../ModelCategory'

/**
 * An Instance that provide methods to request information from a {@link Model},
 * its {@apilink Entry | Entries}, and its {@apilink ModelCategory | Categories}.
 *
 * You can access a ModelInstance using {@apilink StarlightClient.model} or
 * using the dynamic syntax on a {@link DynamicStarlightClient}. Usage
 * examples will use the dynamic syntax.
 *
 * To list all workspace models, use a {@link ModelSelector}.
 *
 * @group Instances
 */
export interface ModelInstanceInterface<D extends SerializedData> {
  /**
   * Returns a {@link StarlightItemResponse} with a single {@link Model}.
   *
   * @example Requesting information from a model of slug `posts`.
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.posts.get()
   * ```
   */
  get(): Promise<StarlightItemResponse<Model>>

  /**
   * Returns a {@link ModelCategoryInstanceInterface}.
   *
   * If you're using a {@link DynamicModelInstance}, you can use the
   * dynamic syntax instead of this method.
   *
   * @example Listing all entries from the "news" category of a model of slug "posts".
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.posts.category('news').entries()
   * ```
   *
   * @param slug The category slug.
   */
  category(slug: string): ModelCategoryInstanceInterface<D>

  /**
   * Returns an {@link EntrySelectorInterface}.
   *
   * This is an accessor, which means that it should be used just like a common
   * object parameter. For instance:
   *
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * // "entries" below is an EntrySelector.
   * const response = await Starlight.posts.entries.list()
   * ```
   */
  get entries(): EntrySelectorInterface<D>

  /**
   * Returns a {@link DynamicModelCategorySelector}.
   *
   * This is an accessor, which means that it should be used just like a common
   * object parameter. For instance:
   *
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * // "categories" below is a DynamicModelCategorySelector.
   * const response = await Starlight.posts.categories.get('interviews')
   * ```
   */
  get categories(): DynamicModelCategorySelector<D>
}

/**
 * An Instance that provide all {@link ModelInstanceInterface} methods and adds support
 * for creating {@apilink ModelCategoryInstance | ModelCategoryInstances} using
 * the dynamic syntax.
 *
 * See {@link ModelInstanceInterface} to view all available methods.
 *
 * See {@doclink requests-and-responses#dynamic-syntax | Dynamic Instances}
 * documentation to learn more about the dynamic syntax.
 *
 * @example Accessing a ModelCategoryInstance using the dynamic syntax.
 * ```ts
 * import Starlight from '@starlightcms/js-sdk'
 *
 * // "articles" below will be a ModelCategoryInstance.
 * const response = await Starlight.posts.articles.list()
 * ```
 *
 * @category Instances
 */
export type DynamicModelInstance<D extends SerializedData> =
  ModelInstanceInterface<D> & {
    [key: string]: ModelCategoryInstanceInterface<D>
  }
