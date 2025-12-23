import { SerializedData, StarlightClient } from '../../types'
import {
  DynamicModelCategorySelector,
  ListModelCategoriesOptions,
  ModelCategorySelector,
} from './types'
import makeModelCategoryInstance from '../../instances/ModelCategory'

export default function makeModelCategorySelector<D extends SerializedData>(
  client: StarlightClient,
  model: string,
): DynamicModelCategorySelector<D> {
  const selector: ModelCategorySelector = {
    list(params, options) {
      return client.get(`/models/${model}/categories`, params, options)
    },

    get(slug, params, options) {
      return client.get(`/models/${model}/categories/${slug}`, params, options)
    },
  }

  return new Proxy(selector, {
    get(target, prop) {
      if (typeof prop === 'string' && !Reflect.has(target, prop)) {
        return makeModelCategoryInstance(client, model, prop)
      }

      return Reflect.get(target, prop)
    },
  }) as DynamicModelCategorySelector<D>
}

export {
  ModelCategorySelector,
  DynamicModelCategorySelector,
  ListModelCategoriesOptions,
}
