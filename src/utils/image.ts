import { MediaFile, MediaObject } from '../types'

/**
 * Returns the optimized variation file of the given MediaObject
 * or the original file if the optimized variation doesn't exist.
 *
 * @param media The MediaObject to analyze.
 */
const getOptimizedOrOriginal = (media: MediaObject) => {
  return (
    media.files.find((file) => file.variation === 'optimized') ??
    (media.files.find((file) => file.variation === 'original') as MediaFile)
  )
}

/**
 * Returns the given variation of the provided MediaObject.
 *
 * @param media The MediaObject to analyze. If undefined, the function will also
 * return undefined.
 * @param variation A string or array of strings with the variation name that
 * should be returned. If an array is given, the first variation found will
 * be returned.
 *
 * @returns The MediaFile of the first given variation found. If the provided
 * variations weren't found, or if no variation parameter was provided, returns
 * the optimized variation file (if it exists) or the original file. Returns
 * undefined if no media object is provided.
 *
 * @example Getting the optimized or original file of the given MediaObject.
 * ```ts
 * import Starlight, { getMediaFile } from '@starlightcms/js-sdk'
 *
 * const response = await Starlight.posts.entries.get('foo')
 *
 * // `info.featured_image` is the path of an arbitrary Media content field.
 * const file = getMediaFile(response.data.data.info.featured_image)
 * ```
 *
 * @category Media Utilities
 */
export const getMediaFile = (
  media?: MediaObject,
  variation?: string | string[],
): MediaFile | undefined => {
  if (!media) return undefined

  if (variation) {
    const variationArray = Array.isArray(variation) ? variation : [variation]

    for (const variationName of variationArray) {
      const file = media.files.find((file) => file.variation === variationName)

      if (file) {
        return file
      }
    }
  }

  return getOptimizedOrOriginal(media)
}

/**
 * Returns the source URL of the optimized file (if it exists) or the original
 * file of the given MediaObject. If the variation parameter is provided,
 * returns the source URL of that variation instead, if it exists, but falls
 * back to the optimized or original files if it doesn't.
 *
 * @param media The MediaObject to analyze. If undefined, the function will also
 * return undefined.
 * @param variation A string or array of strings with the variation name that
 * should be returned. If an array is given, the first variation found will
 * be returned.
 *
 * @returns The source URL of the first given variation found. If the provided
 * variations weren't found, or if no variation parameter was provided, returns
 * the optimized variation source URL (if it exists) or the original source URL.
 * Returns undefined if no media object is provided.
 *
 * @example Getting the optimized or original source URL of the given MediaObject.
 * ```ts
 * import Starlight, { getMediaSource } from '@starlightcms/js-sdk'
 *
 * const response = await Starlight.posts.entries.get('foo')
 *
 * // `content.background` is the path of an arbitrary Media content field.
 * const imageUrl = getMediaSource(response.data.data.content.background)
 * ```
 *
 * @example Getting the source URL of a specific variation of the given MediaObject.
 * ```ts
 * import Starlight, { getMediaSource } from '@starlightcms/js-sdk'
 *
 * const response = await Starlight.posts.entries.get('foo')
 *
 * // `content.background` is the path of an arbitrary Media content field.
 * const imageUrl = getMediaSource(
 *   response.data.data.content.background,
 *   ['large', 'medium']
 * )
 * ```
 *
 * @category Media Utilities
 */
export function getMediaSource(
  media?: MediaObject,
  variation?: string | string[],
) {
  return media ? getMediaFile(media, variation)!.path : undefined
}
