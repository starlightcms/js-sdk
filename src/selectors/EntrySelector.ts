import {
  Entry,
  EntryData,
  StarlightClient,
  StarlightItem,
  StarlightList,
} from '../types'

export default class EntrySelector<D extends EntryData = undefined> {
  protected model: string
  protected client: StarlightClient

  constructor(model: string, client: StarlightClient) {
    this.model = model
    this.client = client
  }

  public async list(): Promise<StarlightList<Entry<D>>> {
    return this.client.get(`/models/${this.model}/entries`)
  }

  public async get(slug: string): Promise<StarlightItem<Entry<D>>> {
    return this.client.get(`/models/${this.model}/entries/${slug}`)
  }
}
