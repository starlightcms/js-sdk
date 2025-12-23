import { StarlightClient } from '../../types'
import { SingletonSelector } from './types'

export default function makeSingletonSelector(
  client: StarlightClient,
): SingletonSelector {
  return {
    list(params, options) {
      return client.get('/singletons', params, options)
    },

    get(slug, params, options) {
      return client.get(`/singletons/${slug}`, params, options)
    },
  }
}

export { SingletonSelector }
