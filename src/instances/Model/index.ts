import {
  Model,
  SerializedData,
  StarlightClient,
  StarlightItemResponse,
} from '../../types'
import { DynamicModelInstance, ModelInstance } from './types'
import makeEntrySelector, { EntrySelector } from '../../selectors/Entry'
import makeModelCategorySelector, {
  DynamicModelCategorySelector,
} from '../../selectors/ModelCategory'
import makeModelCategoryInstance, {
  ModelCategoryInstance,
} from '../ModelCategory'

export default function makeModelInstance<D extends SerializedData>(
  client: StarlightClient,
  model: string
): DynamicModelInstance<D> {
  const instance = {
    get(): Promise<StarlightItemResponse<Model>> {
      return client.get(`/models/${model}`)
    },

    category(slug: string): ModelCategoryInstance<D> {
      return makeModelCategoryInstance(client, model, slug)
    },

    get entries(): EntrySelector<D> {
      return makeEntrySelector<D>(client, model)
    },

    get categories(): DynamicModelCategorySelector<D> {
      return makeModelCategorySelector(client, model)
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
