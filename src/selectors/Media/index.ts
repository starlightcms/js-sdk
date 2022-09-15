import { StarlightClient } from '../../types'
import { MediaSelector } from './types'

export default function makeMediaSelector(
  client: StarlightClient
): MediaSelector {
  return {
    list() {
      return client.get('/media')
    },

    get(id) {
      return client.get(`/media/${id}`)
    },
  }
}

export { MediaSelector }
