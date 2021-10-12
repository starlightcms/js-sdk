import {
  Model,
  StarlightClient,
  StarlightItemResponse,
  StarlightListResponse,
} from '../types'

export default class ModelSelector {
  protected client: StarlightClient

  constructor(client: StarlightClient) {
    this.client = client
  }

  public getClient(): StarlightClient {
    return this.client
  }

  public async list(): Promise<StarlightListResponse<Model>> {
    return this.client.get('/models')
  }

  public async get(slug: string): Promise<StarlightItemResponse<Model>> {
    return this.client.get(`/models/${slug}`)
  }
}
