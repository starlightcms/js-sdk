import { Form, FormSchema, StarlightItemResponse } from '../../types'

/**
 * An Instance that provide methods to request information from a {@link Form}
 * and its {@apilink Field | Fields}.
 *
 * You can access a FormInstance using {@apilink StarlightClient.form} or
 * using the dynamic syntax on a {@link DynamicFormSelector}. Usage
 * examples will use the dynamic syntax.
 *
 * @group Instances
 */
export interface FormInstance {
  /**
   * Returns a {@link StarlightItemResponse} with a single {@link Form}.
   *
   * @example Requesting information from a form of slug `signup`.
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.forms.signup.get()
   * ```
   */
  get(): Promise<StarlightItemResponse<Form>>

  /**
   * Returns a {@link StarlightItemResponse} with a {@link FormSchema}.
   *
   * @example Listing the schema from a form of slug `signup`.
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.forms.signup.schema()
   * ```
   *
   * @param slug The category slug.
   */
  schema(): Promise<StarlightItemResponse<FormSchema>>
}
