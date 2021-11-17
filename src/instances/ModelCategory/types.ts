import {
  Entry,
  ModelCategory,
  ModelFieldOptions,
  SerializedData,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'

export type ModelCategoryEntryListOptions<D extends SerializedData> = {
  page?: number
  limit?: number
  query?: string
  'query:word'?: string
  fields?: string
  order?:
    | 'title:asc'
    | 'title:desc'
    | 'published_at:asc'
    | 'published_at:desc'
    | 'views:asc'
    | 'views:desc'
  except?: number
} & ModelFieldOptions<D>

export interface ModelCategoryInstance<D extends SerializedData> {
  get(): Promise<StarlightItemResponse<ModelCategory>>
  entries(
    options?: ModelCategoryEntryListOptions<D>
  ): Promise<StarlightListResponse<Entry<D>>>
}
