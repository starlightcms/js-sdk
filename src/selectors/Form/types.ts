import { FormInstance } from '../../instances/Form'

/**
 * TODO: update documentation
 *
 * A Selector that provide all {@link ModelSelector} methods and adds support
 * for creating {@apilink DynamicModelInstance | DynamicModelInstances} using
 * the dynamic syntax.
 *
 * See {@link ModelSelector} to view all available methods.
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
export type DynamicFormSelector = {
  [slug: string]: FormInstance
}
