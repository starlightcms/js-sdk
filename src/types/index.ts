import { SerializedData } from './entities'
import { ProxiedModelSelector } from '../selectors/Model'
import { ModelInstance } from '../instances/Model'
import { SingletonSelector } from '../selectors/Singleton'
import { ProxiedCollectionSelector } from '../selectors/Collection'
import { MediaSelector } from '../selectors/Media'

export * from './fields'
export * from './entities'
export * from './visual'

type BaseUrl = 'https://query.starlight.sh/v2' | string

export type StarlightConfig = {
  workspace?: string
  baseUrl?: BaseUrl
  debug?: boolean
}

export interface StarlightClient<
  D extends WorkspaceModelDefinition = DefaultModelDefinition
> {
  configure(config: StarlightConfig): void

  log(message?: unknown, ...optionalParams: unknown[]): void

  getBaseUrl(): string

  get<T = Record<string, unknown>>(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
    options?: RequestInit
  ): Promise<T>

  get models(): ProxiedModelSelector<D>

  model<S extends keyof D>(slug: S): ModelInstance<D[S]>

  get singletons(): SingletonSelector

  get collections(): ProxiedCollectionSelector

  get media(): MediaSelector
}

export type ProxiedStarlightClient<T extends WorkspaceModelDefinition> =
  StarlightClient<T> & {
    [K in keyof T]: ModelInstance<T[K]>
  }

export interface StarlightItemResponse<T> {
  data: T
}

export interface StarlightListResponse<T> {
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
