import { describe, expect, it } from 'vitest'
import { makeClient } from '../../client'
import { MediaSelector } from './index'
import { mediaInfo, mediaList } from '../../../mocks/fixtures'

describe('MediaSelector methods', () => {
  it('should return a specific Media when using the get() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const mediaSelector = new MediaSelector(client)
    const response = await mediaSelector.get('1234567899')

    expect(response).toEqual(mediaInfo)
  })

  it('should return the list of Media when using the list() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const mediaSelector = new MediaSelector(client)
    const response = await mediaSelector.list()

    expect(response).toEqual(mediaList)
  })
})
