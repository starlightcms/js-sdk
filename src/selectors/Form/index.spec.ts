import { describe, it, expect } from 'vitest'
import { makeClient } from '../../client'
import { makeDynamicFormSelector } from './index'
import { FormInstance } from '../../instances/Form'

describe('FormSelector methods', () => {
  it('should return a new FormInstance when using the dynamic syntax', async () => {
    const client = makeClient({ workspace: 'test-workspace' })
    const formSelector = makeDynamicFormSelector(client)
    const formInstance = formSelector.form1

    expect(formInstance).to.be.instanceOf(FormInstance)
  })
})
