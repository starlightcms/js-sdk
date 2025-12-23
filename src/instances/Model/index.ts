import { SerializedData, StarlightClient } from '../../types'
import { DynamicModelInstance, ModelInstance } from './types'
import makeEntrySelector from '../../selectors/Entry'
import makeModelCategorySelector from '../../selectors/ModelCategory'
import makeModelCategoryInstance from '../ModelCategory'

export default function makeModelInstance<D extends SerializedData>(
  client: StarlightClient,
  model: string,
): DynamicModelInstance<D> {
  const instance: ModelInstance<D> = {
    get(params, options) {
      return client.get(`/models/${model}`, params, options)
    },

    category(slug: string) {
      return makeModelCategoryInstance<D>(client, model, slug)
    },

    get entries() {
      return makeEntrySelector<D>(client, model)
    },

    get categories() {
      return makeModelCategorySelector<D>(client, model)
    },
  }

  return new Proxy(instance, {
    get(target, prop) {
      if (typeof prop === 'string' && !Reflect.has(target, prop)) {
        return makeModelCategoryInstance(client, model, prop)
      }

      return Reflect.get(target, prop)
    },
  }) as DynamicModelInstance<D>
}

export { DynamicModelInstance, ModelInstance }
