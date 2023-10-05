import { describe, it, expect } from 'vitest'
import { makeDynamicModelInstance, ModelInstance } from './index'
import { makeClient } from '../../client'
import { modelInfo } from '../../../mocks/fixtures'
import { ModelCategoryInstance } from '../ModelCategory'
import { EntrySelector } from '../../selectors/Entry'
import { ModelCategorySelector } from '../../selectors/ModelCategory'

describe('ModelInstance methods', () => {
  it('should return a ModelInstance object', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const modelInstance = makeDynamicModelInstance(client, 'model1')

    expect(modelInstance).to.be.instanceOf(ModelInstance)
  })

  it('should return a Model object when using the get() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const modelInstance = new ModelInstance(client, 'model1')
    const response = await modelInstance.get()

    expect(response).toEqual(modelInfo)
  })

  it('should return a ModelCategory object when using the category() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const modelInstance = new ModelInstance(client, 'model1')
    const response = await modelInstance.category('category1')

    expect(response).to.be.instanceOf(ModelCategoryInstance)
  })

  it('should return an EntrySelector object when using the entries property', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const modelInstance = new ModelInstance(client, 'model1')
    const response = await modelInstance.entries

    expect(response).to.be.instanceOf(EntrySelector)
  })

  it('should return a ModelCategorySelector object when using the categories property', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const modelInstance = new ModelInstance(client, 'model1')
    const response = await modelInstance.categories

    expect(response).to.be.instanceOf(ModelCategorySelector)
  })
})
