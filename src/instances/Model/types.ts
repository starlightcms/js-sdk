import { Model, SerializedData, StarlightItemResponse } from '../../types'
import { EntrySelector } from '../../selectors/Entry'
import { DynamicModelCategorySelector } from '../../selectors/ModelCategory'
import { ModelCategoryInstance } from '../ModelCategory'

export interface ModelInstance<D extends SerializedData> {
  get(): Promise<StarlightItemResponse<Model>>
  category(slug: string): ModelCategoryInstance<D>
  get entries(): EntrySelector<D>
  get categories(): DynamicModelCategorySelector<D>
}

export type DynamicModelInstance<D extends SerializedData> =
  ModelInstance<D> & {
    [key: string]: ModelCategoryInstance<D>
  }
