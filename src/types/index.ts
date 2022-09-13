import { CollectionTypes, SerializedData } from './entities'
import { DynamicModelSelector } from '../selectors/Model'
import { DynamicModelInstance } from '../instances/Model'
import { SingletonSelector } from '../selectors/Singleton'
import { DynamicCollectionSelector } from '../selectors/Collection'
import { MediaSelector } from '../selectors/Media'
import { SearchSelector } from '../selectors/Search'
import { CollectionInstance } from '../instances/Collection'

export * from './fields'
export * from './entities'
export * from './visual'
export * from './instances'
export * from './selectors'

/**
 * This is a utility type that allows any string to be used as a URL, but
 * provides a default one which can be used by IDEs to provide auto-completion.
 */
export type BaseUrl = 'https://query.starlight.sh/v2' | string

/**
 * @group Client
 */
export type StarlightConfig = {
  workspace?: string
  baseUrl?: BaseUrl
  debug?: boolean
}

/**
 * The Starlight client is the main entry point for any requests you might want
 * to make to Starlight's APIs.
 *
 * There's two ways of interacting with a client: using the
 * {@apilink default | default client} exported by the SDK or creating a new
 * client instance using the
 * {@apilink makeStarlightClient | makeStarlightClient function}. Follow the
 * provided links to learn how to use each method.
 *
 * Either way you choose to interact, all clients expose the same methods and
 * accessors that provide ways to request data. These methods and accessors
 * return Selector or Instance objects, which are documented in the sections
 * of the same name found in this API's sidebar.
 *
 * @group Client
 */
export interface StarlightClient<
  D extends WorkspaceModelDefinition = DefaultModelDefinition
> {
  /**
   * Updates this client's configuration. See {@link StarlightConfig} to see all
   * the available options.
   *
   * @param config A configuration object. Required.
   * @category Other Methods
   */
  configure(config: StarlightConfig): void

  /**
   * Logs a message (or any kind of data, really) into the console if the debug
   * configuration is true. Uses `console.log` internally.
   *
   * This function's type definition is the same as the `console.log` function.
   *
   * @param message The data that will be logged.
   * @param optionalParams Additional data to be logged or string substitutions.
   * @see [MDN documentation on console.log](https://developer.mozilla.org/en-US/docs/web/api/console/log)
   * @internal
   */
  log(message?: unknown, ...optionalParams: unknown[]): void

  /**
   * Returns the base API URL for requests, including the configured workspace.
   * Doesn't include a trailing slash.
   *
   * @internal
   */
  getBaseUrl(): string

  /**
   * Returns a Promise that results in a response or throws an StarlightError.
   * The response will be the parsed JSON data sent by the API.
   *
   * This method is used internally by all Selectors and Instances to request
   * data to Starlight's Query API, but it can also be used standalone if
   * desired.
   *
   * This method automatically prefixes the given path with the API URL, but it
   * doesn't include a trailing slash, so be sure to include one at the start
   * of your path.
   *
   * @param path The path to GET. Will be prefixed with the API URL. Must start
   * with a forward slash (/).
   * @param params An optional object of values that will be converted to a
   * string and passed as GET params.
   * @param options An optional configuration object passed to the fetch method.
   * Check [MDN documentation on fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch)
   * to see the available options.
   * @typeParam T - The shape of the expected response on success. Client
   * methods generally pass {@link StarlightItemResponse} or
   * {@link StarlightListResponse} types here.
   * @throws {@link StarlightError} on any errors.
   * @category Other Methods
   */
  get<T = Record<string, unknown>>(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
    options?: RequestInit
  ): Promise<T>

  /**
   * Returns a {@link DynamicModelSelector}, which is a {@link ModelSelector}
   * with support for creating {@link ModelInstance}s using the dynamic syntax.
   *
   * This is an accessor, which means that it should be used just like a common
   * object parameter. For instance:
   *
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.models.list()
   * ```
   *
   * See {@link DynamicModelSelector} for more info.
   *
   * @category Selector Accessors
   */
  get models(): DynamicModelSelector<D>

  /**
   * Returns a {@link DynamicModelInstance}, which is a
   * {@link ModelInstance} with support for creating
   * {@link ModelCategoryInstance}s using the dynamic syntax. For instance:
   *
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.model('posts').entries.list()
   * ```
   *
   * See {@link DynamicModelInstance} for more info.
   *
   * @category Instance Methods
   */
  model<S extends keyof D>(slug: S): DynamicModelInstance<D[S]>

  /**
   * Returns a {@link SingletonSelector}.
   *
   * This is an accessor, which means that it should be used just like a common
   * object parameter. For instance:
   *
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.singletons.list()
   * ```
   *
   * See {@link SingletonSelector} for more info.
   *
   * @category Selector Accessors
   */
  get singletons(): SingletonSelector

  /**
   * Returns a {@link DynamicCollectionSelector}, which is a
   * {@link CollectionSelector} with support for creating
   * {@link CollectionInstance}s using the dynamic syntax.
   *
   * This is an accessor, which means that it should be used just like a common
   * object parameter. For instance:
   *
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.collections.list()
   * ```
   *
   * See {@link DynamicCollectionSelector} for more info.
   *
   * @category Selector Accessors
   */
  get collections(): DynamicCollectionSelector

  /**
   * Returns a {@link CollectionInstance}. For instance:
   *
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.collection('featured-posts').items()
   * ```
   *
   * See {@link CollectionInstance} for more info.
   *
   * @category Instance Methods
   */
  collection<T extends CollectionTypes = string>(
    slug: string | number
  ): CollectionInstance<T>

  /**
   * Returns a {@link MediaSelector}.
   *
   * This is an accessor, which means that it should be used just like a common
   * object parameter. For instance:
   *
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.media.list()
   * ```
   *
   * See {@link MediaSelector} for more info.
   *
   * @category Selector Accessors
   */
  get media(): MediaSelector

  /**
   * Returns a {@link SearchSelector}.
   *
   * This is an accessor, which means that it should be used just like a common
   * object parameter. For instance:
   *
   * ```ts
   * import Starlight from '@starlightcms/js-sdk'
   *
   * const response = await Starlight.search.entries()
   * ```
   *
   * See {@link SearchSelector} for more info.
   *
   * @category Selector Accessors
   */
  get search(): SearchSelector
}

/**
 * This type adds support for the dynamic syntax to the StarlightClient
 * interface, which allows users to create {@link ModelInstance}s dynamically.
 * See {@link StarlightClient} to learn which methods it provides.
 *
 * This allows TypeScript to correctly type all models defined by the user
 * in the DefaultModelDefinition type, aside from letting the user using any
 * "unknown" model slug, which is provided by the WorkspaceModelDefinition type.
 *
 * This type is only aware of the DefaultModelDefinition type because the
 * StarlightClient uses it by default when no model definition type is passed.
 *
 * @group Client
 */
export type DynamicStarlightClient<T extends WorkspaceModelDefinition> =
  StarlightClient<T> & {
    [K in keyof T]: DynamicModelInstance<T[K]>
  }

/**
 * This interface represents an API response that returns a single entity, like
 * a single {@link Entry} or a single {@link MediaObject}, for instance.
 *
 * It contains only one parameter: `data`. This parameter type is generic and
 * depends on the kind of request that was made to the API.
 *
 * All SDK request methods that return a single item will return this interface.
 *
 * @group Client
 */
export interface StarlightItemResponse<T> {
  /**
   * The entity returned by the API request. Its type depends on which request
   * was made. SDK methods will generally type this parameter automatically.
   */
  data: T
}

/**
 * This interface represents an API response that returns a list of entities,
 * like a list of {@apilink Entry | Entries} or a list of items from a
 * {@link Collection}.
 *
 * It contains a `data` parameter, which is an array of items with a generic
 * type that depends on the kind of request that was made, and two metadata
 * objects: `links` and `meta`. Metadata is useful for pagination.
 *
 * All SDK request methods that return a list of entities will return this
 * interface.
 *
 * @group Client
 */
export interface StarlightListResponse<T> {
  /**
   * The list of entities returned by the API request. Its type depends on which
   * request was made. SDK methods will generally type
   * this parameter automatically.
   */
  data: T[]
  /**
   * An object containing useful links for easier pagination. All links points
   * to the same list requested, but with a varying `page` parameter.
   */
  links: {
    /**
     * A link for the first page of the list.
     */
    first: string
    /**
     * A link for the last page of the list.
     */
    last: string
    /**
     * A link to the previous page of the list, if there's any.
     */
    prev?: string
    /**
     * A link to the next page of the list, if there's any.
     */
    next?: string
  }
  /**
   * An object with useful metadata related to the current list. It can be used
   * in applications to create pagination logic and interfaces.
   *
   * `from` and `to` are indexes indicating which items start and finish the
   * current page of the list. For instance, in a list with 100 items with 15
   * items per page, on the first page, `from` and `to` will be `1` and `15`
   * respectively.
   */
  meta: {
    /**
     * The number of the current page.
     */
    current_page: number
    /**
     * The number of the last page for the current list.
     */
    last_page: number
    /**
     * The index of the first item on this page out of all list items.
     */
    from: number
    /**
     * The index of the last item on this page out of all list items.
     */
    to: number
    /**
     * The number of items per page.
     */
    per_page: number
    /**
     * The total number of items in the current list.
     */
    total: number
  }
}

/**
 *  The DefaultModelDefinition type is used to correctly type Entry data when
 *  requesting it using a StarlightClient.
 *
 *  Without using a DefaultModelDefinition, Entry data will be typed as a
 *  "generic" JS object which can hold any kind of data:
 *
 *  ```ts
 * import Starlight from '@starlightcms/js-sdk'
 *
 * // response type will be StarlightItemResponse<Entry> on request success.
 * const response = await Starlight.posts.entries.get('hello-world')
 *
 * // helloWorld type is Entry<Record<string, unknown>>. This means that
 * // `data` can hold anything, which is not type-safe.
 * const helloWorld = response.data
 * ```
 *
 * One way of safely adding type information to Entry objects is by passing a
 * data definition type to the EntrySelector when requesting something:
 *
 *  ```ts
 * import Starlight, { VisualField, MediaField } from '@starlightcms/js-sdk'
 *
 * type PostFields = {
 *   featured_image: MediaField
 *   content: VisualField
 * }
 *
 * // response type will now be StarlightItemResponse<Entry<PostsFields>>.
 * const response = await Starlight.posts.entries<PostFields>.get('hello-world')
 *
 * // Now, helloWorld type is Entry<PostsFields>.
 * const helloWorld = response.data
 *
 * // Which means we can safely access its data, and TypeScript will
 * // auto-complete the data field name below:
 * console.log(helloWorld.data.featured_image)
 * ```
 *
 * Note that we used "Fields" to define our data shape. We recommend using these
 * types, which are exported by this SDK, because they map to the field types
 * available in the Starlight admin when creating models, and should simplify
 * the type definition process. All available Field types are documented in the
 * {@apilink BooleanField | Data Fields section of this API}.
 *
 * However, passing model definition types around your application is not ideal,
 * and actually unnecessary. Using the DefaultModelDefinition type, all model
 * definitions can be automatically inferred.
 *
 * To get started, you need to create a
 * [type declaration file](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
 * in which you'll define all your types. You can name it anything and place it
 * anywhere inside your project, but we recommend naming it `starlight.d.ts` and
 * placing it in the root folder of your source code, so it can be easily
 * imported later in your application if you ever need to reference these types.
 *
 * In this file, you can place all your model type definitions (including type
 * definitions for Singleton data, if you want!). Finally, you just need to
 * add a "module definition block" that will tell the SDK which types you expect
 * to receive when requesting models.
 *
 * Here's a complete exemple defining two models, Posts and Magazines:
 *
 * ```ts
 * import { StringField, VisualField, MediaField } from '@starlightcms/js-sdk'
 *
 * type PostFields = {
 *   featured_image: MediaField
 *   content: VisualField
 * }
 *
 * type MagazineFields = {
 *   cover_image: MediaField
 *   content: VisualField
 *   issue_number: StringField
 *   issue_year: StringField
 * }
 *
 * declare module '@starlightcms/js-sdk' {
 *   export interface DefaultModelDefinition {
 *     // Notice that each key in this interface is a Model slug!
 *     posts: PostFields
 *     magazines: MagazineFields
 *   }
 * }
 * ```
 *
 * After creating this file, types should be automatically inferred without the
 * need to pass these types around:
 *
 *  ```ts
 * import Starlight from '@starlightcms/js-sdk'
 *
 * // response type will be StarlightItemResponse<Entry<PostsFields>>,
 * // which was implicitly inferred by the SDK!
 * const response = await Starlight.posts.entries.get('hello-world')
 *
 * // helloWorld type is Entry<PostsFields>
 * const helloWorld = response.data
 *
 * // Auto-complete will work just as before when we explicitly type the Entry!
 * console.log(helloWorld.data.featured_image)
 * ```
 *
 *  @group Client
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaultModelDefinition extends WorkspaceModelDefinition {}

/**
 * This type is only used as a base for the DefaultModelDefinition type.
 *
 * @internal
 */
export interface WorkspaceModelDefinition {
  [slug: string]: SerializedData
}
