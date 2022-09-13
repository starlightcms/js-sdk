/**
 * Base interface used by all entities returned by the API.
 *
 * @internal
 */
interface StarlightEntity {
  id: number
  created_at: string
  updated_at?: string
}

/**
 * Represents a Model Category entity returned by the API.
 *
 * @group API Entities
 */
export interface ModelCategory extends StarlightEntity {
  title: string
  slug: string
  entry_count?: number
}

/**
 * Represents a Media File entity returned by the API.
 *
 * @group API Entities
 */
export interface MediaFile extends StarlightEntity {
  variation: string
  path: string
  mime: string
  background_color?: string
  filesize: number
  meta?: Record<string, unknown>
}

/**
 * Represents a Media Object entity returned by the API.
 *
 * @group API Entities
 */
export interface MediaObject extends StarlightEntity {
  name: string
  extension: string
  mime: string
  files: MediaFile[]
  alt?: string
  description?: string
}

/**
 * Represents an Author entity returned by the API.
 *
 * @group API Entities
 */
export interface Author {
  id: number
  name: string
}

/**
 * Represents a Model entity returned by the API.
 *
 * @group API Entities
 */
export interface Model extends StarlightEntity {
  title: string
  slug: string
  entry_count?: number
}

/**
 * Represents content data returned by either an Entry or
 * Singleton entity from the API.
 */
export type SerializedData = Record<string, unknown> | undefined

/**
 * Utility type that creates a string map of all fields of the given
 * SerializedData type with the `field` suffix. This is only useful to create
 * request methods that support field querying using the "field:foo" syntax.
 *
 * @internal
 */
export type ModelFieldOptions<D extends SerializedData> = {
  [K in keyof D as `field:${string & K}`]?: string
}

/**
 * Represents an Entry entity returned by the API.
 *
 * An Entry's `data` field can be further typed by passing an object-like
 * structure as the D generic type. This is useful to provide type-safety to
 * your application, since the `data` field is a generic JS object by default.
 *
 * It's recommended to use the Field types provided by this SDK to type your
 * entities using a type definition file on your project. For instance:
 *
 * ```ts
 * // starlight.d.ts file
 * import { VisualField, MediaField } from '@starlightcms/js-sdk'
 *
 * type PostFields = {
 *   featured_image: MediaField
 *   content: VisualField
 * }
 *
 * declare module '@starlightcms/js-sdk' {
 *   export interface DefaultModelDefinition {
 *     posts: PostFields
 *   }
 * }
 * ```
 *
 * You can place this type definition file anywhere in your repository, but it's
 * good practice to place it at the same level as your root index.ts file. Then,
 * in your files, all SDK calls will correctly type `posts`:
 *
 * ```ts
 * import Starlight from '@starlightcms/js-sdk'
 *
 * // response type will be StarlightItemResponse<Entry<PostFields>> on request success
 * const response = await Starlight.posts.entries.get('hello-world')
 *
 * // helloWorld type is Entry<PostFields>
 * const helloWorld = response.data
 * ```
 *
 * See {@apilink DefaultModelDefinition} for more info.
 *
 * @group API Entities
 */
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

/**
 * Represents a Singleton entity returned by the API.
 *
 * A Singleton's `data` field can be further typed by passing an object-like
 * structure as the D generic type. This is useful to provide type-safety to
 * your application, since the `data` field is a generic JS object by default.
 *
 * It's recommended to use the Field types provided by this SDK to type your
 * Singletons. For instance:
 *
 * ```ts
 * import { StringField, VisualField, MediaField } from '@starlightcms/js-sdk'
 *
 * type HomeFields = {
 *   site_title: StringField
 *   hero_image: MediaField
 *   hero_content: VisualField
 * }
 *
 * // response type will be StarlightItemResponse<Singleton<HomeFields>> on request success
 * const response = Starlight.singletons.get<HomeFields>('home')
 *
 * // home type is Singleton<HomeFields>
 * const home = response.data
 * ```
 *
 * You could also place all your Singleton field types in the same type
 * definition file used to configure Entry fields, which makes it easier to
 * import these types in other files on your project. See
 * {@apilink DefaultModelDefinition} for more info.
 *
 * @group API Entities
 */
export interface Singleton<D extends SerializedData>
  extends Omit<StarlightEntity, 'created_at'> {
  title: string
  slug: string
  data: D
  published_at: string | null
}

/**
 * Currently supported Collection types. This type is mainly used to provide
 * autocompletion on IDEs, since it lets users use any string as well as the
 * known supported types.
 *
 * @internal
 */
export type CollectionTypes = 'entry' | 'singleton' | 'media' | string

/**
 * Represents a Collection entity returned by the API.
 *
 * @group API Entities
 */
export interface Collection<T extends CollectionTypes = string>
  extends StarlightEntity {
  title: string
  slug: string
  type: T
  item_count?: number
}

/**
 * Currently supported Relation types.
 */
type RelationTypes =
  | Entry<never>
  | Singleton<never>
  | MediaObject
  | Collection
  | unknown

/**
 * Represents a Relation entity returned by the API.
 *
 * @group API Entities
 */
export interface Relation<T extends RelationTypes> {
  /**
   * The relation type, which is always a string. If the `object` field of this
   * Relation is an Entry, type will be `entry`, if it's a Singleton, type will
   * be `singleton`, and so on.
   */
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
