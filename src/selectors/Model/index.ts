import {
  Model,
  StarlightClient,
  StarlightItemResponse,
  StarlightListResponse,
  WorkspaceModelDefinition,
} from 'types'
import { ModelSelector, ProxiedModelSelector } from './types'
import makeModelElement from 'elements/Model'

export default function makeModelSelector<D extends WorkspaceModelDefinition>(
  client: StarlightClient
): ProxiedModelSelector<D> {
  const modelClient: ModelSelector = {
    list(): Promise<StarlightListResponse<Model>> {
      return client.get('/models')
    },

    get(slug: string): Promise<StarlightItemResponse<Model>> {
      return client.get(`/models/${slug}`)
    },
  }

  return new Proxy(modelClient, {
    get(target, prop) {
      if (typeof prop === 'string' && !Reflect.has(target, prop)) {
        return makeModelElement(client, prop)
      }

      return Reflect.get(target, prop)
    },
  }) as ProxiedModelSelector<D>
}

export { ModelSelector, ProxiedModelSelector }
