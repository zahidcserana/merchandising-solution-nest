import { Inject, Injectable } from '@nestjs/common'
import { ModelClass, transaction } from 'objection'
import { query } from '../auth/constants'
import { OrderModel } from 'src/database/models/order.model'
import { CustomerModel } from 'src/database/models/customer.model'

@Injectable()
export class CustomersService {
  constructor (
    @Inject('CustomerModel') private modelClass: ModelClass<CustomerModel>,
  ) {}

  findAll (page: number, limit: number, search: string) {
    let pageNo = page ? page : query.page
    let pageLimit = limit ? limit : query.limit

    search = search ? '%' + search + '%' : ''

    if (search == '') {
      return this.modelClass
        .query()
        .select('id', 'name', 'email', 'phone')
        .page(pageNo - 1, pageLimit)
    }

    return this.modelClass
      .query()
      .select('id', 'name', 'email', 'phone')
      .page(pageNo - 1, pageLimit)
      .where('name', 'like', search)
      .orWhere('email', 'like', search)
  }

  list (search: string) {
    search = search ? '%' + search + '%' : ''

    if (search == '') {
      return this.modelClass
        .query()
        .select('id', 'name', 'email', 'phone')
    }

    return this.modelClass
      .query()
      .select('id', 'name', 'email', 'phone')
      .where('name', 'like', search)
      .orWhere('email', 'like', search)
      .orWhere('phone', 'like', search)
  }

  findOneById (id: number) {
    return this.modelClass
      .query()
      .findById(id)
  }

  findOne (slug: string) {
    return this.modelClass.query().findOne({ slug })
  }

  async create (props: Partial<CustomerModel>) {
    return this.modelClass
      .query()
      .insert(props)
      .returning('*')
  }

  update (id: number, props: Partial<CustomerModel>) {
    return this.modelClass
      .query()
      .patch(props)
      .where({ id })
      .returning('*')
      .first()
  }

  delete (id: number) {
    return transaction(this.modelClass, async (_, trx) => {
      return this.modelClass
        .query()
        .deleteById(id)
        .returning('*')
        .first()
        .transacting(trx)
    })
  }
}
