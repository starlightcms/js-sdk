import {
  BaseRequestParameters,
  Form,
  FormSchema,
  StarlightItemResponse,
} from '../../types'

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
   *
   * @param params An optional object of request parameters.
   * @param options An optional object of fetch options. See
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit} for
   * more info.
   */
  get(
    params?: BaseRequestParameters,
    options?: RequestInit,
  ): Promise<StarlightItemResponse<Form>>

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
   * @param params An optional object of request parameters.
   * @param options An optional object of fetch options. See
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit} for
   * more info.
   */
  schema(
    params?: BaseRequestParameters,
    options?: RequestInit,
  ): Promise<StarlightItemResponse<FormSchema>>
}
