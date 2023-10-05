import { describe, it, expect } from 'vitest'
import { ModelCategoryInstance } from './index'
import { makeClient } from '../../client'
import {
  modelCategoryEntries,
  modelCategoryInfo,
} from '../../../mocks/fixtures'

describe('ModelCategoryInstance methods', () => {
  it('should return a Model Category object when using the get() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const modelCategoryInstance = new ModelCategoryInstance(
      client,
      'model1',
      'category1'
    )
    const modelCategory = await modelCategoryInstance.get()

    expect(modelCategory).toEqual(modelCategoryInfo)
  })

  it('should return the entries of a Model Category when using the entries() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const modelCategoryInstance = new ModelCategoryInstance(
      client,
      'model1',
      'category1'
    )
    const modelCategory = await modelCategoryInstance.entries()

    expect(modelCategory).toEqual(modelCategoryEntries)
  })
})
