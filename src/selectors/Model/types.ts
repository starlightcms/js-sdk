import {
  Model,
  StarlightItemResponse,
  StarlightListResponse,
  WorkspaceModelDefinition,
} from '../../types'
import { DynamicModelInstance } from '../../instances/Model'

export interface ModelSelector {
  list(): Promise<StarlightListResponse<Model>>
  get(slug: string): Promise<StarlightItemResponse<Model>>
}

export type DynamicModelSelector<T extends WorkspaceModelDefinition> =
  ModelSelector & {
    [K in keyof T]: DynamicModelInstance<T[K]>
  }
