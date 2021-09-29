import Client from '../client'
import { Model, StarlightItem, StarlightList } from '../types'

export default class ModelSelector {
  protected client: Client

  constructor(client: Client) {
    this.client = client
  }

  public getClient(): Client {
    return this.client
  }

  public async list(): Promise<StarlightList<Model>> {
    return this.client.get('/models')
  }

  public async get(slug: string): Promise<StarlightItem<Model>> {
    return this.client.get(`/models/${slug}`)
  }
}
