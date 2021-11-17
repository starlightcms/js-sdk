import {
  DefaultModelDefinition,
  ProxiedStarlightClient,
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

export function makeClient<
  D extends WorkspaceModelDefinition = DefaultModelDefinition
>(config: StarlightConfig = {}): ProxiedStarlightClient<D> {
  let baseUrl = config.baseUrl ?? 'https://query.starlight.sh/v2'
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
      return `${baseUrl}/workspaces/${workspace}`
    },

    async get(path, params, options) {
      const searchParams = new URLSearchParams(
        params as Record<string, string>
      ).toString()
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

    get singletons() {
      return makeSingletonSelector(this)
    },

    get collections() {
      return makeCollectionSelector(this)
    },

    get media() {
      return makeMediaSelector(this)
    },
  }

  return new Proxy(client, {
    get(target, prop) {
      if (typeof prop === 'string' && !Reflect.has(target, prop)) {
        return makeModelInstance(target, prop)
      }

      return Reflect.get(target, prop)
    },
  }) as ProxiedStarlightClient<D>
}
