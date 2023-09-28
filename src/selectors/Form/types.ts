import { FormInstance } from '../../instances/Form'

/**
 * A Selector that provide all {@link FormSelector} methods and adds support
 * for creating {@apilink DynamicFormInstance | DynamicFormInstances} using
 * the dynamic syntax.
 *
 * See {@link FormSelector} to view all available methods.
 *
 * See {@doclink requests-and-responses#dynamic-syntax | Dynamic Instances}
 * documentation to learn more about the dynamic syntax.
 *
 * @example Accessing a DynamicFormInstance using the dynamic syntax.
 * ```ts
 * import Starlight from '@starlightcms/js-sdk'
 *
 * // "signup" below will be a DynamicFormInstance.
 * const response = await Starlight.forms.signup.get()
 * ```
 *
 * @category Selectors
 */
export type DynamicFormSelector = {
  [slug: string]: FormInstance
}
