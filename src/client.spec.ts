import { describe, it, expect } from 'vitest'

import { makeClient } from './client'
import { modelList } from '../mocks/fixtures'

describe('API: address endpoint', () => {
  it('should return the proper model object', async () => {
    const Client = makeClient({ workspace: 'test-workspace' })
    const models = await Client.models.list()

    expect(models).toEqual(modelList)
  })

  it('should throw error when no workspace is specified', async () => {
    const Client = makeClient()

    expect(Client.getBaseUrl).toThrowError(
      'No workspace defined. Use the `configure()` method on the Starlight client to define one.'
    )
  })
})
