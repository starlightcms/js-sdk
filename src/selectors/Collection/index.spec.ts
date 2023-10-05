import { describe, it, expect } from 'vitest'
import { makeClient } from '../../client'
import { CollectionSelector, makeDynamicCollectionSelector } from './index'
import { CollectionInstance } from '../../instances/Collection'
import { collectionInfo, collectionList } from '../../../mocks/fixtures'

describe('CollectionSelector methods', () => {
  it('should return a new CollectionInstance when using the dynamic syntax', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const collectionSelector = makeDynamicCollectionSelector(client)
    const collectionInstance = collectionSelector.collection1

    expect(collectionSelector).to.be.instanceOf(CollectionSelector)
    expect(collectionInstance).to.be.instanceOf(CollectionInstance)
  })

  it('should return a Collection object when using the get() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const collectionSelector = makeDynamicCollectionSelector(client)
    const response = await collectionSelector.get('collection1')

    expect(response).toEqual(collectionInfo)
  })

  it('should return a list of Collections when using the list() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const collectionSelector = makeDynamicCollectionSelector(client)
    const response = await collectionSelector.list()

    expect(response).toEqual(collectionList)
  })
})
