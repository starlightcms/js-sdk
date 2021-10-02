import EntrySelector from './selectors/EntrySelector'
import ModelSelector from './selectors/ModelSelector'

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

export type StarlightItem<T> = {
  data: T
}

export type StarlightList<T> = {
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

interface StarlightEntity {
  id: number
  created_at: string
  updated_at?: string
}

export interface Model extends StarlightEntity {
  title: string
  slug: string
  entry_count?: number
}

interface Author {
  id: number
  name: string
}

interface ModelCategory extends StarlightEntity {
  title: string
  slug: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaultModelDefinition extends WorkspaceModelDefinition {}

export interface WorkspaceModelDefinition {
  [slug: string]: EntryData
}

export type EntryData = Record<string, unknown> | undefined

export interface Entry<D extends EntryData = undefined>
  extends Omit<StarlightEntity, 'created_at'> {
  title: string
  slug: string
  data: D
  author: Author
  category: ModelCategory | null
  model?: Model
  published_at: string | null
}
