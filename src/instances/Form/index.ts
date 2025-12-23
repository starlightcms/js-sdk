import { StarlightClient } from '../../types'
import { FormInstance } from './types'

export default function makeFormInstance(
  client: StarlightClient,
  form: string,
): FormInstance {
  return {
    get(params, options) {
      return client.get(`/forms/${form}`, params, options)
    },
    schema(params, options) {
      return client.get(`/forms/${form}/schema`, params, options)
    },
  }
}

export { FormInstance }
