import { StarlightConfig } from './types'
import StarlightError from './errors'
import EntrySelector from './selectors/EntrySelector'
import ModelSelector from './selectors/ModelSelector'

export default class Client {
  private debug = false
  private baseUrl = 'https://query.starlight.sh/v2'
  private workspace = ''

  constructor(config?: StarlightConfig) {
    this.configure(config)

    return new Proxy(this, {
      get(target: Client, prop) {
        if (typeof prop === 'string' && !(prop in target)) {
          return target.getEntrySelector(prop)
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return target[prop]
      },
    })
  }

  public configure(config: StarlightConfig = {}): void {
    this.baseUrl =
      (process && process.env && process.env.STARLIGHT_BASE_URL) ??
      config.baseUrl ??
      this.baseUrl
    this.workspace =
      (process && process.env && process.env.STARLIGHT_WORKSPACE) ??
      config.workspace ??
      this.workspace
    this.debug =
      (process && process.env && process.env.STARLIGHT_DEBUG === 'true') ??
      config.debug ??
      this.debug
  }

  protected log(message?: unknown, ...optionalParams: unknown[]): void {
    if (this.debug) {
      console.log(message, ...optionalParams)
    }
  }

  public getBaseUrl(): string {
    return `${this.baseUrl}/workspaces/${this.workspace}`
  }

  public async get<T = Record<string, unknown>>(
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
  }

  private getEntrySelector(slug: string): EntrySelector {
    return new EntrySelector(slug, this)
  }

  public models(): ModelSelector {
    return new ModelSelector(this)
  }
}
