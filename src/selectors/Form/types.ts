import { FormInstance } from '../../instances/Form'

/**
 * A Selector that provides a way to create {@apilink FormInstance | FormInstances}
 * using the dynamic syntax.
 *
 * See {@doclink requests-and-responses#dynamic-syntax | Dynamic Instances}
 * documentation to learn more about the dynamic syntax.
 *
 * @example Accessing a FormInstance using the dynamic syntax.
 * ```ts
 * import Starlight from '@starlightcms/js-sdk'
 *
 * // "signup" below will be a FormInstance.
 * const response = await Starlight.forms.signup.get()
 * ```
 *
 * @category Selectors
 */
export type DynamicFormSelector = {
  [slug: string]: FormInstance
}
