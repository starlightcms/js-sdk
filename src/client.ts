import {
  ProxiedStarlightClient,
  StarlightClient,
  StarlightConfig,
  WorkspaceModelDefinition,
} from './types'
import StarlightError from './errors'
import EntrySelector from './selectors/EntrySelector'
import ModelSelector from './selectors/ModelSelector'

export function makeClient<D extends WorkspaceModelDefinition>(
  config: StarlightConfig = {}
): ProxiedStarlightClient<D> {
  let baseUrl = config.baseUrl ?? 'https://query.starlight.sh/v2'
  let workspace = config.workspace ?? ''
  let debug = config.debug ?? false

  const client: StarlightClient = {
    configure(config: StarlightConfig) {
      baseUrl = config.baseUrl ?? baseUrl
      workspace = config.workspace ?? workspace
      debug = config.debug ?? debug
    },
    log(message, ...optionalParams) {
      if (debug) console.log(message, ...optionalParams)
    },
    getBaseUrl(): string {
      return `${baseUrl}/workspaces/${workspace}`
    },
    async get<T = Record<string, unknown>>(
      path: string,
      options?: RequestInit
    ): Promise<T> {
      this.log(`Starlight - GET ${path}`)

      const response = await fetch(`${this.getBaseUrl()}${path}`, options)

      if (response.status >= 200 && response.status < 300) {
        return await response.json()
      } else {
        const message = `Starlight - GET ${path} returned ${response.status}: ${response.statusText}`

        throw new StarlightError(message)
      }
    },
    getEntrySelector(slug: string): EntrySelector {
      return new EntrySelector(slug, this)
    },
    models(): ModelSelector {
      return new ModelSelector(this)
    },
  }

  return new Proxy(client, {
    get(target, prop) {
      if (typeof prop === 'string' && !Reflect.has(target, prop)) {
        return target.getEntrySelector(prop)
      }

      return Reflect.get(target, prop)
    },
  }) as ProxiedStarlightClient<D>
}
