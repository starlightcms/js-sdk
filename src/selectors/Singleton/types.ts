import {
  SerializedData,
  Singleton,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'

export interface SingletonSelector {
  get<D extends SerializedData>(
    slug: string
  ): Promise<StarlightItemResponse<Singleton<D>>>
  list(): Promise<StarlightListResponse<Singleton<Record<string, unknown>>>>
}
