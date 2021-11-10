import {
  ModelCategory,
  SerializedData,
  StarlightItemResponse,
  StarlightListResponse,
} from 'types'
import { ModelCategoryElement } from 'elements/ModelCategory'

export interface ModelCategorySelector {
  list(): Promise<StarlightListResponse<ModelCategory>>
  get(slug: string): Promise<StarlightItemResponse<ModelCategory>>
}

export type ProxiedModelCategorySelector<D extends SerializedData> =
  ModelCategorySelector & {
    [slug: string]: ModelCategoryElement<D>
  }
