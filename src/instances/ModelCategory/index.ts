import {
  Entry,
  ModelCategory,
  QueryableFields,
  SerializedData,
  StarlightClient,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'
import {
  ModelCategoryInstanceInterface,
  ModelCategoryEntryListParams,
} from './types'

export class ModelCategoryInstance<D extends SerializedData>
  implements ModelCategoryInstanceInterface<D>
{
  client: StarlightClient
  model: string
  category: string

  constructor(client: StarlightClient, model: string, category: string) {
    this.client = client
    this.model = model
    this.category = category
  }

  get(): Promise<StarlightItemResponse<ModelCategory>> {
    return this.client.get(`/models/${this.model}/categories/${this.category}`)
  }

  entries(
    options?: ModelCategoryEntryListParams & QueryableFields<D>
  ): Promise<StarlightListResponse<Entry<D>>> {
    return this.client.get(
      `/models/${this.model}/categories/${this.category}/entries`,
      options
    )
  }
}

export { ModelCategoryInstanceInterface, ModelCategoryEntryListParams }
