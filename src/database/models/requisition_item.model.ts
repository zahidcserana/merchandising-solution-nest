import { RequisitionModel } from './requisition.model'
import { Model } from 'objection'
import { BaseModel } from './base.model'
import { ColorModel } from './color.model'
import { ProductModel } from './product.model'
import { SizeModel } from './size.model'

const unique = require('objection-unique')({
  fields: [['product_id', 'color_id', 'size_id']],
  identifiers: ['id'],
})

export class RequisitionItemModel extends unique(BaseModel) {
  static tableName = 'requisition_items'

  requisitionId: number
  productId: number
  colorId: number
  sizeId: number
  quantity: number
  status: string

  requisition: RequisitionModel
  product: ProductModel
  color: ColorModel
  size: SizeModel

  static relationMappings = {
    requisition: {
      modelClass: RequisitionModel,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'requisition_items.requisitionId',
        to: 'requisitions.id',
      },
    },
    product: {
      modelClass: ProductModel,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'requisition_items.productId',
        to: 'products.id',
      },
    },
    color: {
      modelClass: ColorModel,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'requisition_items.colorId',
        to: 'colors.id',
      },
    },
    size: {
      modelClass: SizeModel,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'requisition_items.sizeId',
        to: 'sizes.id',
      },
    },
  }
}
