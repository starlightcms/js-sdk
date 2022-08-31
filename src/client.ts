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
import makeSearchSelector from './selectors/Search'
import makeCollectionInstance from './instances/Collection'

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

    async get(path, params = {}, options) {
      const filteredParams = Object.keys(params).reduce((accumulator, key) => {
        const param = params[key]

        if (param || param === false) accumulator[key] = String(param)

        return accumulator
      }, {} as Record<string, string>)

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

    get singletons() {
      return makeSingletonSelector(this)
    },

    get collections() {
      return makeCollectionSelector(this)
    },

    collection(slug: string | number) {
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
  }) as ProxiedStarlightClient<D>
}
