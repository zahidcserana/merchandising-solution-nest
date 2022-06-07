import { CustomerModel } from 'src/database/models/customer.model'
import { BaseModel } from './base.model'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { Model } from 'objection'
const softDelete = require('objection-soft-delete')

const unique = require('objection-unique')({
  fields: ['number'],
  identifiers: ['id'],
})

export class RequisitionModel extends softDelete({ columnName: 'deleted' })(
  unique(BaseModel),
) {
  static tableName = 'requisitions'

  number: string
  customerId: number
  requiredDate: string
  status: string
  deleted: boolean

  customer: CustomerModel

  static relationMappings = {
    customer: {
      modelClass: CustomerModel,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'requisitions.customerId',
        to: 'customers.id',
      },
    },
  }
}
