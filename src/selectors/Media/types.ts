import {
  MediaObject,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'

export interface MediaSelector {
  get(slug: number | string): Promise<StarlightItemResponse<MediaObject>>
  list(): Promise<StarlightListResponse<MediaObject>>
}
