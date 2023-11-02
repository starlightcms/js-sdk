import { describe, it, expect } from 'vitest'
import { makeClient } from '../../client'
import {
  makeDynamicModelCategorySelector,
  ModelCategorySelector,
} from './index'
import { ModelCategoryInstance } from '../../instances/ModelCategory'
import { modelCategoryInfo, modelCategoryList } from '../../../mocks/fixtures'

describe('ModelCategorySelector methods', () => {
  it('should return a new ModelCategoryInstance when using the dynamic syntax', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const modelCategorySelector = makeDynamicModelCategorySelector(
      client,
      'model1'
    )
    const modelCategoryInstance = modelCategorySelector.category1

    expect(modelCategorySelector).to.be.instanceOf(ModelCategorySelector)
    expect(modelCategoryInstance).to.be.instanceOf(ModelCategoryInstance)
  })

  it('should return a ModelCategory object when using the get() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const modelCategorySelector = makeDynamicModelCategorySelector(
      client,
      'model1'
    )
    const response = await modelCategorySelector.get('category1')

    expect(response).toEqual(modelCategoryInfo)
  })

  it('should return the list of categories of a Model when using the list() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const modelCategorySelector = makeDynamicModelCategorySelector(
      client,
      'model1'
    )
    const response = await modelCategorySelector.list()

    expect(response).toEqual(modelCategoryList)
  })
})
