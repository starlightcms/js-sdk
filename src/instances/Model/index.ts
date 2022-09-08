import {
  Model,
  SerializedData,
  StarlightClient,
  StarlightItemResponse,
} from '../../types'
import { ProxiedModelInstance } from './types'
import makeEntrySelector, { EntrySelector } from '../../selectors/Entry'
import makeModelCategorySelector, {
  ProxiedModelCategorySelector,
} from '../../selectors/ModelCategory'
import makeModelCategoryInstance, {
  ModelCategoryInstance,
} from '../ModelCategory'

export default function makeModelInstance<D extends SerializedData>(
  client: StarlightClient,
  model: string
): ProxiedModelInstance<D> {
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

    get categories(): ProxiedModelCategorySelector<D> {
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
  }) as ProxiedModelInstance<D>
}

export { ProxiedModelInstance }
