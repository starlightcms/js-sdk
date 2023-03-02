import { MediaFile, MediaObject } from '../types'

const getOptimizedOrOriginal = (media: MediaObject) => {
  return (
    media.files.find((file) => file.variation === 'optimized') ??
    (media.files.find((file) => file.variation === 'original') as MediaFile)
  )
}

export const getMediaFile = (
  media: MediaObject,
  variation?: string
): MediaFile => {
  if (variation) {
    return (
      media.files.find((file) => file.variation === variation) ??
      getOptimizedOrOriginal(media)
    )
  }

  return getOptimizedOrOriginal(media)
}

export const getMediaSource = (
  media: MediaObject,
  variation?: string
): string => {
  return getMediaFile(media, variation).path
}
