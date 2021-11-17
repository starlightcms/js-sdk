import { StarlightClient } from '../../types'
import { MediaSelector } from './types'

export default function makeMediaSelector(
  client: StarlightClient
): MediaSelector {
  return {
    list() {
      return client.get('/media')
    },

    get(slug) {
      return client.get(`/media/${slug}`)
    },
  }
}

export { MediaSelector }
