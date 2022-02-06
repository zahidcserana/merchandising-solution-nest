import { BaseModel } from './base.model'

export class CustomerModel extends BaseModel {
  static tableName = 'customers'

  name: string
  phone: string
  email: string
  address: string
  country: string
}
