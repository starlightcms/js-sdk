interface StarlightEntity {
  id: number
  created_at: string
  updated_at?: string
}

export interface ModelCategory extends StarlightEntity {
  title: string
  slug: string
  entry_count?: number
}

export interface MediaFile extends StarlightEntity {
  variation: string
  path: string
  mime: string
  background_color?: string
  filesize: number
  meta?: Record<string, unknown>
}

export interface MediaObject extends StarlightEntity {
  name: string
  extension: string
  mime: string
  files: MediaFile[]
  alt?: string
  description?: string
}

export interface Author {
  id: number
  name: string
}

export interface Model extends StarlightEntity {
  title: string
  slug: string
  entry_count?: number
}

export type SerializedData = Record<string, unknown> | undefined

export type ModelFieldOptions<D extends SerializedData> = {
  [K in keyof D as `field:${string & K}`]?: string
}

export interface Entry<D extends SerializedData>
  extends Omit<StarlightEntity, 'created_at'> {
  title: string
  slug: string
  data: D
  author: Author
  model?: Model
  category: ModelCategory | null
  published_at: string | null
}

export interface Singleton<D extends SerializedData>
  extends Omit<StarlightEntity, 'created_at'> {
  title: string
  slug: string
  data: D
  published_at: string | null
}

export type CollectionTypes = 'entry' | 'singleton' | 'media' | string

export interface Collection<T extends CollectionTypes = string>
  extends StarlightEntity {
  title: string
  slug: string
  type: T
  item_count?: number
}

type RelationTypes =
  | Entry<never>
  | Singleton<never>
  | MediaObject
  | Collection
  | unknown

export interface Relation<T extends RelationTypes> {
  type: T extends Entry<never>
    ? 'entry'
    : T extends Singleton<never>
    ? 'singleton'
    : T extends MediaObject
    ? 'media'
    : T extends Collection
    ? 'collection'
    : string
  id: number
  object: T
}
