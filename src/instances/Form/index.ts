import {
  Form,
  FormSchema,
  StarlightClient,
  StarlightItemResponse,
} from '../../types'
import { FormInstanceInterface } from './types'

export class FormInstance implements FormInstanceInterface {
  client: StarlightClient
  form: string

  constructor(client: StarlightClient, form: string) {
    this.client = client
    this.form = form
  }

  get(): Promise<StarlightItemResponse<Form>> {
    return this.client.get(`/forms/${this.form}`)
  }

  schema(): Promise<StarlightItemResponse<FormSchema>> {
    return this.client.get(`/forms/${this.form}/schema`)
  }
}
