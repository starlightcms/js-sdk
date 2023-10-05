import {
  MediaObject,
  StarlightClient,
  StarlightListResponse,
  StarlightItemResponse,
} from '../../types'
import { MediaSelectorInterface } from './types'

export class MediaSelector implements MediaSelectorInterface {
  client: StarlightClient

  constructor(client: StarlightClient) {
    this.client = client
  }

  list(): Promise<StarlightListResponse<MediaObject>> {
    return this.client.get('/media')
  }

  get(id: string): Promise<StarlightItemResponse<MediaObject>> {
    return this.client.get(`/media/${id}`)
  }
}

export { MediaSelectorInterface }
