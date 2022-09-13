import {
  Model,
  StarlightClient,
  StarlightItemResponse,
  StarlightListResponse,
  WorkspaceModelDefinition,
} from '../../types'
import { ModelSelector, DynamicModelSelector } from './types'
import makeModelInstance from '../../instances/Model'

export default function makeModelSelector<D extends WorkspaceModelDefinition>(
  client: StarlightClient
): DynamicModelSelector<D> {
  const modelClient: ModelSelector = {
    list(): Promise<StarlightListResponse<Model>> {
      return client.get('/models')
    },

    get(slug): Promise<StarlightItemResponse<Model>> {
      return client.get(`/models/${slug}`)
    },
  }

  return new Proxy(modelClient, {
    get(target, prop) {
      if (typeof prop === 'string' && !Reflect.has(target, prop)) {
        return makeModelInstance(client, prop)
      }

      return Reflect.get(target, prop)
    },
  }) as DynamicModelSelector<D>
}

export { ModelSelector, DynamicModelSelector }
