import { Model, StarlightClient, StarlightItem, StarlightList } from '../types'

export default class ModelSelector {
  protected client: StarlightClient

  constructor(client: StarlightClient) {
    this.client = client
  }

  public getClient(): StarlightClient {
    return this.client
  }

  public async list(): Promise<StarlightList<Model>> {
    return this.client.get('/models')
  }

  public async get(slug: string): Promise<StarlightItem<Model>> {
    return this.client.get(`/models/${slug}`)
  }
}
