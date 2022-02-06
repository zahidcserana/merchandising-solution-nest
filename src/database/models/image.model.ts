import { BaseModel } from './base.model'

export class ImageModel extends BaseModel {
  static tableName = 'images'

  productId: number
  variantProductId: number
  model: string
  file: string
  is_default: boolean
}
