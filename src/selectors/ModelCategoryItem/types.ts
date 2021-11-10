import {
  Entry,
  SerializedData,
  StarlightItemResponse,
  StarlightListResponse,
} from 'types'

export interface ModelCategoryItemSelector<D extends SerializedData> {
  get(slug: string): Promise<StarlightItemResponse<Entry<D>>>
  list(): Promise<StarlightListResponse<Entry<D>>>
}
