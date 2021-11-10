import { Model, SerializedData, StarlightItemResponse } from '../../types'
import { EntrySelector } from '../../selectors/Entry'
import { ProxiedModelCategorySelector } from '../../selectors/ModelCategory'

export interface ModelElement<D extends SerializedData> {
  get(): Promise<StarlightItemResponse<Model>>
  get entries(): EntrySelector<D>
  get categories(): ProxiedModelCategorySelector<D>
}
