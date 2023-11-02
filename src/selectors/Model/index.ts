import {
  Model,
  StarlightClient,
  StarlightItemResponse,
  StarlightListResponse,
  WorkspaceModelDefinition,
} from '../../types'
import { ModelSelectorInterface, DynamicModelSelector } from './types'
import { makeDynamicModelInstance } from '../../instances/Model'

export class ModelSelector implements ModelSelectorInterface {
  client: StarlightClient

  constructor(client: StarlightClient) {
    this.client = client
  }

  list(): Promise<StarlightListResponse<Model>> {
    return this.client.get('/models')
  }

  get(slug: string | number): Promise<StarlightItemResponse<Model>> {
    return this.client.get(`/models/${slug}`)
  }
}

export function makeDynamicModelSelector<D extends WorkspaceModelDefinition>(
  client: StarlightClient
): DynamicModelSelector<D> {
  const selector = new ModelSelector(client)

  return new Proxy(selector, {
    get(target, prop) {
      if (typeof prop === 'string' && !Reflect.has(target, prop)) {
        return makeDynamicModelInstance(client, prop)
      }

      return Reflect.get(target, prop)
    },
  }) as DynamicModelSelector<D>
}

export { ModelSelectorInterface, DynamicModelSelector }
