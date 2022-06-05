import { Inject, Injectable } from '@nestjs/common'
import { ModelClass, transaction } from 'objection'
import { query } from '../auth/constants'
import { OrderModel } from 'src/database/models/order.model'

@Injectable()
export class OrdersService {
  constructor (
    @Inject('OrderModel') private modelClass: ModelClass<OrderModel>,
  ) {}

  findAll (page: number, limit: number, search: string) {
    let pageNo = page ? page : query.page
    let pageLimit = limit ? limit : query.limit

    search = search ? '%' + search + '%' : ''

    if (search == '') {
      return this.modelClass
        .query()
        .withGraphFetched('customer')
        .page(pageNo - 1, pageLimit)
    }

    return this.modelClass
      .query()
      .withGraphFetched('customer')
      .page(pageNo - 1, pageLimit)
      .where('number', 'like', search)
      .orWhere('customer_id', 'like', search)
  }

  list (search: string) {
    search = search ? '%' + search + '%' : ''

    if (search == '') {
      return this.modelClass
        .query()
        .select('id', 'number as name', 'customer_id')
    }

    return this.modelClass
      .query()
      .select('id', 'number as name', 'customer_id')
      .where('name', 'like', search)
      .orWhere('id', 'like', search)
  }

  findOneById (id: number) {
    return this.modelClass
      .query()
      .withGraphFetched('customer')
      .findById(id)
  }

  findOne (slug: string) {
    return this.modelClass.query().findOne({ slug })
  }

  async create (props: Partial<OrderModel>) {
    return this.modelClass
      .query()
      .insert(props)
      .returning('*')
  }

  update (id: number, props: Partial<OrderModel>) {
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
