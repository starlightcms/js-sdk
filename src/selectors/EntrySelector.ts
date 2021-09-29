import Client from '../client'
import { Entry, StarlightItem, StarlightList } from '../types'

export default class EntrySelector {
  protected model: string
  protected client: Client

  constructor(model: string, client: Client) {
    this.model = model
    this.client = client
  }

  public async list(): Promise<StarlightList<Entry>> {
    return this.client.get(`/models/${this.model}/entries`)
  }

  public async get(slug: string): Promise<StarlightItem<Entry>> {
    return this.client.get(`/models/${this.model}/entries/${slug}`)
  }
}
