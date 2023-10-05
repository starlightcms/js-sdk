import { describe, it, expect } from 'vitest'
import { makeClient } from '../../client'
import { EntrySelector } from './index'
import { entryInfo, entryList } from '../../../mocks/fixtures'

describe('EntrySelector methods', () => {
  it('should return an Entry object when using the get() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const entrySelector = new EntrySelector(client, 'model1')
    const response = await entrySelector.get('entry1')

    expect(response).toEqual(entryInfo)
  })

  it('should return a list of Entries when using the list() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const entrySelector = new EntrySelector(client, 'model1')
    const response = await entrySelector.list()

    expect(response).toEqual(entryList)
  })
})
