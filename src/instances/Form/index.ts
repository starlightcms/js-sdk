import {
  Form,
  FormSchema,
  StarlightClient,
  StarlightItemResponse,
} from '../../types'
import { FormInstance } from './types'

export default function makeFormInstance(
  client: StarlightClient,
  form: string
): FormInstance {
  return {
    get(): Promise<StarlightItemResponse<Form>> {
      return client.get(`/forms/${form}`)
    },
    schema(): Promise<StarlightItemResponse<FormSchema>> {
      return client.get(`/forms/${form}/schema`)
    },
  }
}

export { FormInstance }
