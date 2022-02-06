import { Inject, Injectable } from '@nestjs/common'
import { ModelClass, transaction } from 'objection'
import { query } from '../auth/constants'
import { VariantProductModel } from 'src/database/models/variant_product.model'

@Injectable()
export class VariantProductsService {
  constructor (
    @Inject('VariantProductModel')
    private modelClass: ModelClass<VariantProductModel>,
  ) {}

  findAll (page: number, limit: number, search: string) {
    let pageNo = page ? page : query.page
    let pageLimit = limit ? limit : query.limit

    search = search ? '%' + search + '%' : ''

    if (search == '') {
      return this.modelClass
        .query()
        .withGraphFetched('[product, color, size]')
        .page(pageNo - 1, pageLimit)
    }

    return this.modelClass
      .query()
      .withGraphFetched('[product, color, size]')
      .page(pageNo - 1, pageLimit)
  }

  findOneById (id: number) {
    return this.modelClass
      .query()
      .findById(id)
      .withGraphFetched('[product, color, size]')
  }

  findOne (barcode: string) {
    return this.modelClass.query().findOne({ barcode })
  }

  async create (props: Partial<VariantProductModel>) {
    return this.modelClass
      .query()
      .insert(props)
      .returning('*')
  }

  update (id: number, props: Partial<VariantProductModel>) {
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
