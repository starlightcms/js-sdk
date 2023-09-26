import { Form, FormSchema, StarlightItemResponse } from '../../types'

/**
 * TODO: update documentation below
 *
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
export interface FormInstance {
  /**
   * TODO: update documentation below
   *
   * Returns a {@link StarlightItemResponse} with a single {@link Model}.
   *
   * @example Requesting information from a model of slug `posts`.
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.posts.get()
   * ```
   */
  get(): Promise<StarlightItemResponse<Form>>

  /**
   * TODO: update documentation below
   *
   * Returns a {@link ModelCategoryInstance}.
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
  schema(): Promise<StarlightItemResponse<FormSchema>>
}
