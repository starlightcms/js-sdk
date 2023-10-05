import { describe, it, expect } from 'vitest'
import { makeClient } from '../../client'
import { ModelSelector, makeDynamicModelSelector } from './index'
import { ModelInstance } from '../../instances/Model'
import { modelInfo, modelList } from '../../../mocks/fixtures'

describe('ModelSelector methods', () => {
  it('should return a new ModelInstance when using the dynamic syntax', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const modelSelector = makeDynamicModelSelector(client)
    const modelInstance = modelSelector.model1

    expect(modelSelector).to.be.instanceOf(ModelSelector)
    expect(modelInstance).to.be.instanceOf(ModelInstance)
  })

  it('should return a specific Model when using the get() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const modelSelector = makeDynamicModelSelector(client)
    const response = await modelSelector.get('model1')

    expect(response).toEqual(modelInfo)
  })

  it('should return a list of Models when using the list() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const modelSelector = makeDynamicModelSelector(client)
    const response = await modelSelector.list()

    expect(response).toEqual(modelList)
  })
})
