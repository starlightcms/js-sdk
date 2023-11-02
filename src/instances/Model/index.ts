import {
  Model,
  SerializedData,
  StarlightClient,
  StarlightItemResponse,
} from '../../types'
import { DynamicModelInstance, ModelInstanceInterface } from './types'
import { EntrySelector, EntrySelectorInterface } from '../../selectors/Entry'
import {
  DynamicModelCategorySelector,
  makeDynamicModelCategorySelector,
} from '../../selectors/ModelCategory'
import {
  ModelCategoryInstance,
  ModelCategoryInstanceInterface,
} from '../ModelCategory'

export class ModelInstance<D extends SerializedData>
  implements ModelInstanceInterface<D>
{
  client: StarlightClient
  model: string

  constructor(client: StarlightClient, model: string) {
    this.client = client
    this.model = model
  }

  get(): Promise<StarlightItemResponse<Model>> {
    return this.client.get(`/models/${this.model}`)
  }

  category(slug: string): ModelCategoryInstanceInterface<D> {
    return new ModelCategoryInstance(this.client, this.model, slug)
  }

  get entries(): EntrySelectorInterface<D> {
    return new EntrySelector<D>(this.client, this.model)
  }

  get categories(): DynamicModelCategorySelector<D> {
    return makeDynamicModelCategorySelector(this.client, this.model)
  }
}

export function makeDynamicModelInstance<D extends SerializedData>(
  client: StarlightClient,
  model: string
): DynamicModelInstance<D> {
  const instance = new ModelInstance(client, model)

  return new Proxy(instance, {
    get(target, prop) {
      if (typeof prop === 'string' && !Reflect.has(target, prop)) {
        return new ModelCategoryInstance(client, model, prop)
      }

      return Reflect.get(target, prop)
    },
  }) as unknown as DynamicModelInstance<D>
}

export { DynamicModelInstance, ModelInstanceInterface }
