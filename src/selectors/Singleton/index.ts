import {
  Singleton,
  StarlightClient,
  StarlightListResponse,
  StarlightItemResponse,
  SerializedData,
} from '../../types'
import { SingletonSelectorInterface } from './types'

export class SingletonSelector implements SingletonSelectorInterface {
  client: StarlightClient

  constructor(client: StarlightClient) {
    this.client = client
  }

  list(): Promise<StarlightListResponse<Singleton<Record<string, unknown>>>> {
    return this.client.get('/singletons')
  }

  get<D extends SerializedData>(
    slug: string
  ): Promise<StarlightItemResponse<Singleton<D>>> {
    return this.client.get(`/singletons/${slug}`)
  }
}

export { SingletonSelectorInterface }
