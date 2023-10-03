import { describe, it, expect } from 'vitest'
import { CollectionInstance } from './index'
import { makeClient } from '../../client'
import { collectionInfo, collectionItems } from '../../../mocks/fixtures'

describe('CollectionInstance methods', () => {
  it("should return the proper collection object (using collection('collectionName'))", async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const collectionInstance = new CollectionInstance(client, 'collection1')
    const collection = await collectionInstance.get()

    expect(collection).toEqual(collectionInfo)
  })

  it("should return the proper collection items (using collection('collectionName'))", async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const collectionInstance = new CollectionInstance(client, 'collection1')
    const collection = await collectionInstance.items()

    expect(collection).toEqual(collectionItems)
  })
})
