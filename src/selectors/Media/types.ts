import {
  BaseRequestParameters,
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
export interface MediaSelector {
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
   * @param params An optional object of request parameters.
   * @param options An optional object of fetch options. See
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit} for
   * more info.
   */
  get(
    id: number | string,
    params?: BaseRequestParameters,
    options?: RequestInit,
  ): Promise<StarlightItemResponse<MediaObject>>

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
   *
   * @param params An optional object of request parameters.
   * @param options An optional object of fetch options. See
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit} for
   * more info.
   */
  list(
    params?: BaseRequestParameters,
    options?: RequestInit,
  ): Promise<StarlightListResponse<MediaObject>>
}
