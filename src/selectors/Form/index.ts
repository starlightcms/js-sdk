import { StarlightClient } from '../../types'
import { DynamicFormSelector } from './types'
import makeFormInstance from '../../instances/Form'

export default function makeFormSelector(
  client: StarlightClient
): DynamicFormSelector {
  return new Proxy(
    {},
    {
      get(target, prop) {
        if (typeof prop === 'string' && !Reflect.has(target, prop)) {
          return makeFormInstance(client, prop)
        }

        return Reflect.get(target, prop)
      },
    }
  )
}
