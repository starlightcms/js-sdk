import {
  Entry,
  ModelCategory,
  QueryableFields,
  SerializedData,
  StarlightClient,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'
import { ModelCategoryInstance, ModelCategoryEntryListParams } from './types'

export default function makeModelCategoryInstance<D extends SerializedData>(
  client: StarlightClient,
  model: string,
  category: string
): ModelCategoryInstance<D> {
  return {
    get(): Promise<StarlightItemResponse<ModelCategory>> {
      return client.get(`/models/${model}/categories/${category}`)
    },
    entries(
      options: ModelCategoryEntryListParams & QueryableFields<D>
    ): Promise<StarlightListResponse<Entry<D>>> {
      return client.get(
        `/models/${model}/categories/${category}/entries`,
        options
      )
    },
  }
}

export { ModelCategoryInstance, ModelCategoryEntryListParams }
