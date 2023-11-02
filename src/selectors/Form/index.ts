import { StarlightClient } from '../../types'
import { DynamicFormSelector } from './types'
import { FormInstance } from '../../instances/Form'

export function makeDynamicFormSelector(
  client: StarlightClient
): DynamicFormSelector {
  return new Proxy(
    {},
    {
      get(target, prop) {
        if (typeof prop === 'string' && !Reflect.has(target, prop)) {
          return new FormInstance(client, prop)
        }

        return Reflect.get(target, prop)
      },
    }
  )
}
