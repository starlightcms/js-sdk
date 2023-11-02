import {
  ModelCategory,
  SerializedData,
  StarlightClient,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'
import {
  ModelCategorySelectorInterface,
  DynamicModelCategorySelector,
  ListModelCategoriesOptions,
} from './types'
import { ModelCategoryInstance } from '../../instances/ModelCategory'

export class ModelCategorySelector implements ModelCategorySelectorInterface {
  client: StarlightClient
  model: string

  constructor(client: StarlightClient, model: string) {
    this.client = client
    this.model = model
  }

  list(
    options: ListModelCategoriesOptions | undefined
  ): Promise<StarlightListResponse<ModelCategory>> {
    return this.client.get(`/models/${this.model}/categories`, { ...options })
  }

  get(slug: string): Promise<StarlightItemResponse<ModelCategory>> {
    return this.client.get(`/models/${this.model}/categories/${slug}`)
  }
}

export function makeDynamicModelCategorySelector<D extends SerializedData>(
  client: StarlightClient,
  model: string
): DynamicModelCategorySelector<D> {
  const selector = new ModelCategorySelector(client, model)

  return new Proxy(selector, {
    get(target, prop) {
      if (typeof prop === 'string' && !Reflect.has(target, prop)) {
        return new ModelCategoryInstance(client, model, prop)
      }

      return Reflect.get(target, prop)
    },
  }) as unknown as DynamicModelCategorySelector<D>
}

export {
  ModelCategorySelectorInterface,
  DynamicModelCategorySelector,
  ListModelCategoriesOptions,
}
