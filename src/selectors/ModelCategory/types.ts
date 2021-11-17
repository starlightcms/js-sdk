import {
  ModelCategory,
  SerializedData,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'
import { ModelCategoryInstance } from '../../instances/ModelCategory'

export type ListModelCategoriesOptions = {
  query?: string
  page?: number
  limit?: number
  order?: 'title:asc' | 'title:desc' | 'entry_count:asc' | 'entry_count:desc'
}

export interface ModelCategorySelector {
  list(
    options?: ListModelCategoriesOptions
  ): Promise<StarlightListResponse<ModelCategory>>
  get(slug: string): Promise<StarlightItemResponse<ModelCategory>>
}

export type ProxiedModelCategorySelector<D extends SerializedData> =
  ModelCategorySelector & {
    [slug: string]: ModelCategoryInstance<D>
  }
