import { StarlightClient, WorkspaceModelDefinition } from '../../types'
import { DynamicModelSelector, ModelSelector } from './types'
import makeModelInstance from '../../instances/Model'

export default function makeModelSelector<D extends WorkspaceModelDefinition>(
  client: StarlightClient,
): DynamicModelSelector<D> {
  const modelClient: ModelSelector = {
    list(params, options) {
      return client.get('/models', params, options)
    },

    get(slug, params, options) {
      return client.get(`/models/${slug}`, params, options)
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
