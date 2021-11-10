import {
  Entry,
  SerializedData,
  StarlightClient,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'
import { ModelCategoryItemSelector } from './types'

export default function makeModelCategoryItemSelector<D extends SerializedData>(
  client: StarlightClient,
  model: string,
  category: string
): ModelCategoryItemSelector<D> {
  return {
    list(): Promise<StarlightListResponse<Entry<D>>> {
      return client.get(`/models/${model}/categories/${category}/items`)
    },

    get(slug: string): Promise<StarlightItemResponse<Entry<D>>> {
      return client.get(`/models/${model}/categories/${category}/items/${slug}`)
    },
  }
}

export { ModelCategoryItemSelector }
