import { ModelCategory, SerializedData, StarlightItemResponse } from 'types'
import { ModelCategoryItemSelector } from 'selectors/ModelCategoryItem'

export interface ModelCategoryElement<D extends SerializedData> {
  get(): Promise<StarlightItemResponse<ModelCategory>>
  get items(): ModelCategoryItemSelector<D>
}
