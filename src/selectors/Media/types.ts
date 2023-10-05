import {
  MediaObject,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'

/**
 * A Selector that provide methods to list and request information on
 * {@apilink MediaObject | MediaObjects}.
 *
 * You can use a MediaSelector by accessing
 * {@apilink StarlightClient.media}.
 *
 * @group Selectors
 */
export interface MediaSelectorInterface {
  /**
   * Returns a {@link StarlightItemResponse} with a single {@link MediaObject}.
   *
   * Note: MediaObjects are identified by their IDs, since they don't have slugs.
   *
   * @example Requesting information from a media object of id "123456789".
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.media.get('123456789')
   * ```
   *
   * @param id The media object ID.
   */
  get(id: number | string): Promise<StarlightItemResponse<MediaObject>>

  /**
   * Returns a {@link StarlightListResponse} with the list of
   * {@apilink MediaObject | MediaObjects} in this workspace.
   *
   * @example Requesting all media objects from the workspace.
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.media.list()
   * ```
   */
  list(): Promise<StarlightListResponse<MediaObject>>
}
