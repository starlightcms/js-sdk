import {
  SerializedData,
  Singleton,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'

/**
 * A Selector that provide methods to list and request information on
 * {@apilink Singleton | Singletons}.
 *
 * You can use an SingletonSelector by accessing
 * {@apilink ModelInstance.singletons}.
 *
 * @group Selectors
 */
export interface SingletonSelectorInterface {
  /**
   * Returns a {@link StarlightItemResponse} with a single {@link Singleton}.
   * This methods supports typing the returned Singleton by passing its data
   * type as the generic type `<D>`.
   *
   * @example Requesting information from a singleton of slug "home".
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.singletons.get('home')
   * ```
   *
   * @example Typing last example's response.
   * ```ts
   * import Starlight, { StringField, MediaField, VisualField } from '@starlightcms/js-sdk'
   *
   * type HomeFields = {
   *   title: StringField
   *   subtitle: StringField
   *   hero_image: MediaField
   *   hero_content: VisualField
   * }
   *
   * // `response.data` will be of type Singleton<HomeFields>
   * const response = await Starlight.singletons.get<HomeFields>('home')
   * ```
   * @typeParam D - The type of the returned Singleton's `data` property.
   * @param slug The singleton slug.
   */
  get<D extends SerializedData>(
    slug: string
  ): Promise<StarlightItemResponse<Singleton<D>>>

  /**
   * Returns a {@link StarlightListResponse} with a list of
   * {@apilink Singleton | Singletons}.
   *
   * @example Requesting all workspace singletons.
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.singletons.list()
   * ```
   */
  list(): Promise<StarlightListResponse<Singleton<Record<string, unknown>>>>
}
