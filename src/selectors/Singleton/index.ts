import { StarlightClient } from '../../types'
import { SingletonSelector } from './types'

export default function makeSingletonSelector(
  client: StarlightClient
): SingletonSelector {
  return {
    list() {
      return client.get('/singletons')
    },

    get(slug) {
      return client.get(`/singletons/${slug}`)
    },
  }
}

export { SingletonSelector }
