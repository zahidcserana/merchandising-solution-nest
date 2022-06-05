import { CategoryModel } from './category.model'
import { BaseModel } from './base.model'
const softDelete = require('objection-soft-delete')
import { Model } from 'objection'

const unique = require('objection-unique')({
  fields: ['name'],
  identifiers: ['id'],
})

export class ProductModel extends softDelete({ columnName: 'deleted' })(
  unique(BaseModel),
) {
  static tableName = 'products'

  name: string
  composition: string
  price: number
  status: string
  variants: string
  colors: string
  sizes: string
  quantity: number
  po_quantity: number
  ready_quantity: number
  delivered_quantity: number
  category_id: number
  barcode: string
  deleted: boolean

  category: CategoryModel

  static relationMappings = {
    category: {
      modelClass: CategoryModel,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'products.categoryId',
        to: 'categories.id',
      },
    },
  }
}
