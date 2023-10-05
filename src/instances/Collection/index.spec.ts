import { describe, it, expect } from 'vitest'
import { CollectionInstance } from './index'
import { makeClient } from '../../client'
import { collectionInfo, collectionItems } from '../../../mocks/fixtures'

describe('CollectionInstance methods', () => {
  it('should return a Collection object when using the get() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const collectionInstance = new CollectionInstance(client, 'collection1')
    const response = await collectionInstance.get()

    expect(response).toEqual(collectionInfo)
  })

  it('should return a Collection item list when using the items() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const collectionInstance = new CollectionInstance(client, 'collection1')
    const response = await collectionInstance.items()

    expect(response).toEqual(collectionItems)
  })
})
