import EntrySelector from '../selectors/EntrySelector'
import ModelSelector from '../selectors/ModelSelector'
import { SerializedData } from './entities'

export * from './fields'
export * from './entities'

type BaseUrl = 'https://query.starlight.sh/v2' | string

export type StarlightConfig = {
  workspace?: string
  baseUrl?: BaseUrl
  debug?: boolean
}

export interface StarlightClient {
  configure(config: StarlightConfig): void

  log(message?: unknown, ...optionalParams: unknown[]): void

  getBaseUrl(): string

  get<T = Record<string, unknown>>(
    path: string,
    options?: RequestInit
  ): Promise<T>

  getEntrySelector(slug: string): EntrySelector

  models(): ModelSelector
}

export type ProxiedStarlightClient<T extends WorkspaceModelDefinition> =
  StarlightClient & {
    [K in keyof T]: EntrySelector<T[K]>
  }

export type StarlightItemResponse<T> = {
  data: T
}

export type StarlightListResponse<T> = {
  data: T[]
  links: {
    first: string
    last: string
    prev?: string
    next?: string
  }
  meta: {
    current_page: number
    last_page: number
    from: number
    to: number
    per_page: number
    total: number
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaultModelDefinition extends WorkspaceModelDefinition {}

export interface WorkspaceModelDefinition {
  [slug: string]: SerializedData
}
