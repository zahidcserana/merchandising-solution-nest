import { BaseModel } from './base.model'
import { IsEmail, IsNotEmpty } from 'class-validator'
const softDelete = require('objection-soft-delete')

const unique = require('objection-unique')({
  fields: ['name'],
  identifiers: ['id'],
})

export class ColorModel extends softDelete({ columnName: 'deleted' })(
  unique(BaseModel),
) {
  static tableName = 'colors'

  name: string
  slug: string
  deleted: boolean
}
