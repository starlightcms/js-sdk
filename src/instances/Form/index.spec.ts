import { describe, it, expect } from 'vitest'
import { FormInstance } from './index'
import { makeClient } from '../../client'
import { formInfo, formSchema } from '../../../mocks/fixtures'

describe('FormInstance methods', () => {
  it('should return a Form object when using the get() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const formInstance = new FormInstance(client, 'form1')
    const response = await formInstance.get()

    expect(response).toEqual(formInfo)
  })

  it('should return a Form schema when using the schema() method', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const formInstance = new FormInstance(client, 'form1')
    const response = await formInstance.schema()

    expect(response).toEqual(formSchema)
  })
})
