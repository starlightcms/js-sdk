import {
  DefaultModelDefinition,
  DynamicStarlightClient,
  StarlightClient,
  StarlightConfig,
  WorkspaceModelDefinition,
} from './types'
import { StarlightError } from './errors'
import makeModelSelector from './selectors/Model'
import makeModelInstance from './instances/Model'
import makeSingletonSelector from './selectors/Singleton'
import makeCollectionSelector from './selectors/Collection'
import makeMediaSelector from './selectors/Media'
import makeSearchSelector from './selectors/Search'
import makeCollectionInstance from './instances/Collection'
import makeFormSelector from './selectors/Form'
import makeFormInstance from './instances/Form'

/**
 * Returns a new {@link DynamicStarlightClient}, which is a
 * {@link StarlightClient} with support to create
 * {@apilink ModelInstance | ModelInstances} using the dynamic syntax. To learn
 * which methods a client supports, see {@link StarlightClient}.
 *
 * This function accepts a {@link StarlightConfig} object and can be used to
 * create new clients that connect to a single Starlight workspace. Each client
 * returned by this function is separate and independent of the others.
 *
 * If you only need to make requests to a single workspace, it's probably easier
 * to use the SDK's default client. To use it, you only need to
 * import the default object exported by the SDK:
 *
 *  ```ts
 * // `Starlight` below is the default StarlightClient.
 * import Starlight from '@starlightcms/js-sdk'
 * ```
 *
 * See {@link default} for more info on how to use the default client.
 *
 * @example Creating a new client and exporting it.
 *  ```ts
 * import { makeStarlightClient } from '@starlightcms/js-sdk'
 *
 * const BlogClient = makeStarlightClient({
 *   workspace: '123123123',
 *   debug: true
 * })
 *
 * // Feel free to export the new client so your application can use it.
 * export default BlogClient
 * ```
 *
 * @param config The client configuration object. You need to provide at least
 * the `workspace` property. See {@link StarlightConfig} to view all the
 * available options.
 * @group Client
 */
export function makeClient<
  D extends WorkspaceModelDefinition = DefaultModelDefinition,
>(
  config: StarlightConfig = {},
): DynamicStarlightClient<D & WorkspaceModelDefinition> {
  let baseUrl = config.baseUrl ?? 'https://query.starlightcms.io/v2'
  let workspace = config.workspace ?? ''
  let debug = config.debug ?? false

  const client: StarlightClient = {
    configure(config) {
      baseUrl = config.baseUrl ?? baseUrl
      workspace = config.workspace ?? workspace
      debug = config.debug ?? debug
    },

    log(message, ...optionalParams) {
      if (debug) console.log(message, ...optionalParams)
    },

    getBaseUrl() {
      if (!workspace.length) {
        throw new Error(
          'No workspace defined. Use the `configure()` method on the Starlight client to define one.',
        )
      }

      return `${baseUrl}/workspaces/${workspace}`
    },

    async get(path, params = {}, options) {
      const filteredParams = Object.keys(params).reduce(
        (accumulator, key) => {
          const param = params[key]

          if (param || param === false || param === 0)
            accumulator[key] = String(param)

          return accumulator
        },
        {} as Record<string, string>,
      )

      const searchParams = new URLSearchParams(filteredParams).toString()
      const finalPath = searchParams ? `${path}?${searchParams}` : path

      this.log(`Starlight - GET ${finalPath}`)

      const response = await fetch(`${this.getBaseUrl()}${finalPath}`, options)

      if (response.status >= 200 && response.status < 300) {
        return await response.json()
      } else {
        const message = `Starlight - GET ${path} returned ${response.status}: ${response.statusText}`
        throw new StarlightError(message, response)
      }
    },

    get models() {
      return makeModelSelector(this)
    },

    model(slug) {
      return makeModelInstance(this, slug as string)
    },

    get forms() {
      return makeFormSelector(this)
    },

    form(slug) {
      return makeFormInstance(this, String(slug))
    },

    get singletons() {
      return makeSingletonSelector(this)
    },

    get collections() {
      return makeCollectionSelector(this)
    },

    collection(slug) {
      return makeCollectionInstance(this, slug)
    },

    get media() {
      return makeMediaSelector(this)
    },

    get search() {
      return makeSearchSelector(this)
    },
  }

  return new Proxy(client, {
    get(target, prop) {
      if (typeof prop === 'string' && !Reflect.has(target, prop)) {
        return makeModelInstance(target, prop)
      }

      return Reflect.get(target, prop)
    },
  }) as DynamicStarlightClient<D & WorkspaceModelDefinition>
}
