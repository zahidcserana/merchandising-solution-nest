import { Model } from 'objection'
import { BaseModel } from './base.model'
import { ColorModel } from './color.model'
import { ProductModel } from './product.model'
import { SizeModel } from './size.model'

export class VariantProductModel extends BaseModel {
  static tableName = 'variant_products'

  productId: number
  colorId: number
  sizeId: number
  quantity: number
  po_quantity: string
  ready_quantity: string
  delivered_quantity: string
  is_default: boolean

  product: ProductModel
  color: ColorModel
  size: SizeModel

  static relationMappings = {
    product: {
      modelClass: `${__dirname}/product.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'variant_products.productId',
        to: 'products.id',
      },
    },
    color: {
      modelClass: `${__dirname}/color.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'variant_products.colorId',
        to: 'colors.id',
      },
    },
    size: {
      modelClass: `${__dirname}/size.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'variant_products.sizeId',
        to: 'sizes.id',
      },
    },
  }
}
