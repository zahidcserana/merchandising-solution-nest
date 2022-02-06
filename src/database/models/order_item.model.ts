import { BaseModel } from './base.model'

export class OrderItemModel extends BaseModel {
  static tableName = 'order_items'

  order_id: number
  product_id: number
  quantity: number
  quantity_shipped: number
  price: number
}
