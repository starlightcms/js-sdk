import {
  Model,
  SerializedData,
  StarlightClient,
  StarlightItemResponse,
} from '../../types'
import { ModelElement } from './types'
import makeEntrySelector, { EntrySelector } from '../../selectors/Entry'
import makeModelCategorySelector, {
  ProxiedModelCategorySelector,
} from '../../selectors/ModelCategory'

export default function makeModelElement<D extends SerializedData>(
  client: StarlightClient,
  model: string
): ModelElement<D> {
  return {
    get(): Promise<StarlightItemResponse<Model>> {
      return client.get(`/models/${model}`)
    },

    get entries(): EntrySelector<D> {
      return makeEntrySelector<D>(client, model)
    },

    get categories(): ProxiedModelCategorySelector<D> {
      return makeModelCategorySelector(client, model)
    },
  }
}

export { ModelElement }
