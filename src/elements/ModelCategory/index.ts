import {
  ModelCategory,
  SerializedData,
  StarlightClient,
  StarlightItemResponse,
} from '../../types'
import { ModelCategoryElement } from './types'
import makeModelCategoryItemSelector, {
  ModelCategoryItemSelector,
} from '../../selectors/ModelCategoryItem'

export default function makeModelCategoryElement<D extends SerializedData>(
  client: StarlightClient,
  model: string,
  category: string
): ModelCategoryElement<D> {
  return {
    get(): Promise<StarlightItemResponse<ModelCategory>> {
      return client.get(`/models/${model}/categories/${category}`)
    },
    get items(): ModelCategoryItemSelector<D> {
      return makeModelCategoryItemSelector(client, model, category)
    },
  }
}

export { ModelCategoryElement }
