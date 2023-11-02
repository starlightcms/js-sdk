import { describe, expect, it } from 'vitest'
import { makeClient } from '../../client'
import { SearchSelector } from './index'
import { searchResult } from '../../../mocks/fixtures'

describe('SearchSelector methods', () => {
  it('should return all the entries when using the entries() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const searchSelector = new SearchSelector(client)
    const response = await searchSelector.entries()

    expect(response).toEqual(searchResult)
  })
})
