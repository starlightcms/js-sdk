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
 * Represents an Author entity returned by the API. Authors are returned in
 * {@link Entry} requests.
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
 * Represents content data returned by either an {@link Entry} or
 * {@link Singleton} entity from the API.
 *
 * This is a utility type used internally by the SDK and you don't
 * need to use it. Its purpose is to constraint Entry and Singleton
 * data to the shape of a JS object.
 *
 * @category Internal Types
 */
export type SerializedData = Record<string, unknown> | undefined

/**
 * Utility type that creates a string map of all fields of the given
 * SerializedData type with the `field:` prefix. This syntax allows to filter
 * specific fields when listing {@apilink Entry | Entries}:
 *
 * - Text fields can be filtered by a string query. This works just like
 *   passing a `query` parameter, but it only applies to one field.
 * - Boolean fields can be filtered by "true" or "false".
 *
 * If a request uses this type, it means that this syntax can be used in their
 * parameters:
 *
 * ```ts
 * import Starlight from '@starlightcms/js-sdk'
 *
 * const response = await Starlight.posts.entries.list({
 *   // EntrySelector.list() supports the "field:foo" syntax:
 *   'field:content': 'hello world',
 *   'field:is_featured': true,
 *
 *   // EntrySelector.list() also support other parameters,
 *   // which are passed in this object too:
 *   page: 42,
 *   limit: 20,
 * })
 * ```
 *
 * @remark
 *
 * The information below is only useful for SDK maintainers.
 *
 * This type receives a {@link SerializedData}-like structure, like an object.
 * For instance, for an {@link Entry} with fields "content" and "summary",
 * the generated type would look like this:
 *
 * ```ts
 * type GeneratedType = {
 *   'field:content'?: string
 *   'field:summary'?: string
 * }
 * ```
 *
 * However, note that QueryableFields receive a {@link SerializedData}, not an
 * {@link Entry}:
 *
 * ```ts
 * import { VisualField, StringField } from '@starlightcms/js-sdk'
 *
 * type EntryFields = {
 *   content: VisualField
 *   summary: StringField
 * }
 *
 * type MyEntry = Entry<EntryFields>
 *
 * // Error TS2344: Type does not satisfy the constraint 'SerializedData'
 * type GeneratedType = QueryableFields<MyEntry>
 *
 * // Works!
 * type GeneratedType = QueryableFields<EntryFields>
 * ```
 *
 * This type is only useful to request methods that support
 * field querying using the "field:foo" syntax.
 *
 * @category Internal Types
 */
export type QueryableFields<D extends SerializedData> = {
  [K in keyof D as `field:${string & K}`]?: string | boolean
}

/**
 * Utility type that return {@link QueryableFields} if the given type T
 * is an {@link Entry} or a {@link Singleton}, but generates an empty object
 * otherwise.
 *
 * Fun fact: internally, Entries and Singletons have parent Models,
 * which is why they are called "modelables" here.
 *
 * @category Internal Types
 */
export type WithQueryableFieldsOnModelables<T> = T extends
  | Entry<never>
  | Singleton<never>
  ? QueryableFields<T['data']>
  : never

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
 * Currently supported Collection entities. This type is mainly used to infer
 * the collection type string (see {@link CollectionTypes}) from the type of
 * entity that that Collection holds.
 *
 * @internal
 */
export type CollectionEntityTypes =
  | Entry<never>
  | Singleton<never>
  | MediaObject
  | unknown

/**
 * Infers a Collection type from an entity type. See {@link CollectionTypes} and
 * {@link CollectionEntityTypes} to know more.
 *
 * @internal
 */
export type CollectionTypeMapper<T extends CollectionEntityTypes> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Entry<any>
    ? 'entry'
    : T extends Singleton<any> // eslint-disable-line @typescript-eslint/no-explicit-any
    ? 'singleton'
    : T extends MediaObject
    ? 'media'
    : string

/**
 * Represents a Collection entity returned by the API.
 *
 * You can request collections using a {@link CollectionInstance} or a
 * {@link CollectionSelector}.
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
