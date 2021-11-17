import {
  Model,
  StarlightItemResponse,
  StarlightListResponse,
  WorkspaceModelDefinition,
} from '../../types'
import { ModelInstance } from '../../instances/Model'

export interface ModelSelector {
  list(): Promise<StarlightListResponse<Model>>
  get(slug: string): Promise<StarlightItemResponse<Model>>
}

export type ProxiedModelSelector<T extends WorkspaceModelDefinition> =
  ModelSelector & {
    [K in keyof T]: ModelInstance<T[K]>
  }
