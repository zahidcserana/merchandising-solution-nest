import { Model } from 'objection'
import { BaseModel } from './base.model'
import { CustomerModel } from './customer.model'

export class OrderModel extends BaseModel {
  static tableName = 'orders'

  total: number
  sub_total: number
  discount: number
  tax: number
  customer_id: number
  item_count: number
  ordered_at: Date
  required_at: Date
  number: string
  notes: string
  status: string
  is_cancelled: boolean

  customer: CustomerModel

  static relationMappings = {
    customer: {
      modelClass: `${__dirname}/customer.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'orders.customer_id',
        to: 'customers.id',
      },
    },
  }
}
