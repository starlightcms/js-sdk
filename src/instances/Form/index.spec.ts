import { describe, it, expect } from 'vitest'
import { FormInstance } from './index'
import { makeClient } from '../../client'
import { formInfo, formSchema } from '../../../mocks/fixtures'

describe('FormInstance methods', () => {
  it("should return the proper form object (using form('formName'))", async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const formInstance = new FormInstance(client, 'form1')
    const form = await formInstance.get()

    expect(form).toEqual(formInfo)
  })

  it("should return the proper form schema (using form('formName'))", async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const formInstance = new FormInstance(client, 'form1')
    const form = await formInstance.schema()

    expect(form).toEqual(formSchema)
  })
})
