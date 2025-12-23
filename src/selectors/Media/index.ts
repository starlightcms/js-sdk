import { StarlightClient } from '../../types'
import { MediaSelector } from './types'

export default function makeMediaSelector(
  client: StarlightClient,
): MediaSelector {
  return {
    list(params, options) {
      return client.get('/media', params, options)
    },

    get(id, params, options) {
      return client.get(`/media/${id}`, params, options)
    },
  }
}

export { MediaSelector }
