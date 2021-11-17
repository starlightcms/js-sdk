import {
  Singleton,
  StarlightItemResponse,
  StarlightListResponse,
} from '../../types'

export interface SingletonSelector {
  get(
    slug: string
  ): Promise<StarlightItemResponse<Singleton<Record<string, unknown>>>>
  list(): Promise<StarlightListResponse<Singleton<Record<string, unknown>>>>
}
