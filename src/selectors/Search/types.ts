import { Entry, SerializedData, StarlightListResponse } from '../../types'

export type SearchEntriesOptions = {
  page?: number
  limit?: number
  query?: string
  models?: string
  categories?: string
  order?:
    | 'title:asc'
    | 'title:desc'
    | 'published_at:asc'
    | 'published_at:desc'
    | 'updated_at:asc'
    | 'updated_at:desc'
  except?: number
}

export interface SearchSelector {
  entries<T extends SerializedData = Record<string, unknown>>(
    options?: SearchEntriesOptions
  ): Promise<StarlightListResponse<Entry<T>>>
}
