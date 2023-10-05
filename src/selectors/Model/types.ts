import {
  Model,
  StarlightItemResponse,
  StarlightListResponse,
  WorkspaceModelDefinition,
} from '../../types'
import { DynamicModelInstance } from '../../instances/Model'

/**
 * A Selector that provide methods to list and request information on
 * {@apilink Model | Models}.
 *
 * You can use a ModelSelector by accessing
 * {@apilink StarlightClient.models}.
 *
 * To list entries or categories of a specific model, use a
 * {@link ModelInstance}.
 *
 * @group Selectors
 */
export interface ModelSelectorInterface {
  /**
   * Returns a {@link StarlightListResponse} with a list of
   * {@apilink Model | Models}.
   *
   * @example Requesting all models from a workspace.
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.models.list()
   * ```
   */
  list(): Promise<StarlightListResponse<Model>>

  /**
   * Returns a {@link StarlightItemResponse} with a single {@link Model}.
   *
   * Note that this method only returns information on a model, like its title,
   * slug, creation date, and entry count. If you want list its entries or
   * categories, you need to use a {@link ModelInstance}.
   *
   * @example Requesting information from a model of slug "clients".
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.posts.entries.get('clients')
   * ```
   *
   * @param slug The model slug.
   */
  get(slug: string): Promise<StarlightItemResponse<Model>>
}

/**
 * A Selector that provide all {@link ModelSelectorInterface} methods and adds support
 * for creating {@apilink DynamicModelInstance | DynamicModelInstances} using
 * the dynamic syntax.
 *
 * See {@link ModelSelectorInterface} to view all available methods.
 *
 * See {@doclink requests-and-responses#dynamic-syntax | Dynamic Instances}
 * documentation to learn more about the dynamic syntax.
 *
 * @example Accessing a DynamicModelInstance using the dynamic syntax.
 * ```ts
 * import Starlight from '@starlightcms/js-sdk'
 *
 * // "posts" below will be a DynamicModelInstance.
 * const response = await Starlight.models.posts.entries.list()
 * ```
 *
 * @category Selectors
 */
export type DynamicModelSelector<T extends WorkspaceModelDefinition> =
  ModelSelectorInterface & {
    [K in keyof T]: DynamicModelInstance<T[K]>
  }
