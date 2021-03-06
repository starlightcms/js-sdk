import {
  Entry,
  ModelFieldOptions,
  SerializedData,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'

export type ListEntriesOptions<D extends SerializedData> = {
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

export interface EntrySelector<D extends SerializedData> {
  get(slug: string): Promise<StarlightItemResponse<Entry<D>>>
  list(
    options?: ListEntriesOptions<D>
  ): Promise<StarlightListResponse<Entry<D>>>
}
