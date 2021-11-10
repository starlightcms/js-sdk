import {
  Model,
  StarlightItemResponse,
  StarlightListResponse,
  WorkspaceModelDefinition,
} from '../../types'
import { ModelElement } from '../../elements/Model'

export interface ModelSelector {
  list(): Promise<StarlightListResponse<Model>>
  get(slug: string): Promise<StarlightItemResponse<Model>>
}

export type ProxiedModelSelector<T extends WorkspaceModelDefinition> =
  ModelSelector & {
    [K in keyof T]: ModelElement<T[K]>
  }
