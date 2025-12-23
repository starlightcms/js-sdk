import { SerializedData, StarlightClient } from '../../types'
import { ModelCategoryEntryListParams, ModelCategoryInstance } from './types'

export default function makeModelCategoryInstance<D extends SerializedData>(
  client: StarlightClient,
  model: string,
  category: string,
): ModelCategoryInstance<D> {
  return {
    get(params, options) {
      return client.get(
        `/models/${model}/categories/${category}`,
        params,
        options,
      )
    },
    entries(params, options) {
      return client.get(
        `/models/${model}/categories/${category}/entries`,
        params,
        options,
      )
    },
  }
}

export { ModelCategoryInstance, ModelCategoryEntryListParams }
