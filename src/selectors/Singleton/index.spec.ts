import { describe, expect, it } from 'vitest'
import { makeClient } from '../../client'
import { SingletonSelector } from './index'
import { singletonInfo, singletonList } from '../../../mocks/fixtures'

describe('SingletonSelector methods', () => {
  it('should return a specific Singleton when using the get() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const singletonSelector = new SingletonSelector(client)
    const response = await singletonSelector.get('singleton1')

    expect(response).toEqual(singletonInfo)
  })

  it('should return the list of Singletons when using the list() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const singletonSelector = new SingletonSelector(client)
    const response = await singletonSelector.list()

    expect(response).toEqual(singletonList)
  })
})
