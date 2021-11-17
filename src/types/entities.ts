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

export interface Collection extends StarlightEntity {
  title: string
  slug: string
  type: 'entry' | 'singleton' | 'media' | string
  item_count?: number
}

export interface Relation<D extends SerializedData = Record<string, unknown>> {
  type: 'entry' | 'media' | 'singleton' | 'collection' | string
  id: number
  object: Entry<D> | Singleton<D> | MediaObject | Collection
}
