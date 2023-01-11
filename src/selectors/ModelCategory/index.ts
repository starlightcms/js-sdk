import {
  ModelCategory,
  SerializedData,
  StarlightClient,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'
import {
  ModelCategorySelector,
  DynamicModelCategorySelector,
  ListModelCategoriesOptions,
} from './types'
import makeModelCategoryInstance from '../../instances/ModelCategory'

export default function makeModelCategorySelector<D extends SerializedData>(
  client: StarlightClient,
  model: string
): DynamicModelCategorySelector<D> {
  const selector: ModelCategorySelector = {
    list(options): Promise<StarlightListResponse<ModelCategory>> {
      return client.get(`/models/${model}/categories`, { ...options })
    },

    get(slug): Promise<StarlightItemResponse<ModelCategory>> {
      return client.get(`/models/${model}/categories/${slug}`)
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
