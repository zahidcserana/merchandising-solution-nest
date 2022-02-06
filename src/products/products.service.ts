import { Inject, Injectable } from '@nestjs/common'
import { ModelClass, transaction } from 'objection'
import { query } from '../auth/constants'
import { ProductModel } from 'src/database/models/product.model'

@Injectable()
export class ProductsService {
  constructor (
    @Inject('ProductModel') private modelClass: ModelClass<ProductModel>,
  ) {}

  findAll (page: number, limit: number, search: string) {
    let pageNo = page ? page : query.page
    let pageLimit = limit ? limit : query.limit

    search = search ? '%' + search + '%' : ''

    if (search == '') {
      return this.modelClass.query().page(pageNo - 1, pageLimit)
    }

    return this.modelClass
      .query()
      .page(pageNo - 1, pageLimit)
      .where('name', 'ILike', search)
      .orWhere('barcode', 'ILike', search)
  }

  list (search: string, id: number) {
    if (id > 0) {
      return this.modelClass.query().where('id', id).select('id', 'name', 'barcode')
    }

    if (!search) {
      return this.modelClass.query().select('id', 'name', 'barcode')
    }

    return this.modelClass
      .query()
      .select('id', 'name', 'barcode')
      .where('name', 'ILike', '%' + search + '%')
      .orWhere('barcode', 'ILike', '%' + search + '%')
  }

  findOneById (id: number) {
    return this.modelClass.query().findById(id)
  }

  findOne (barcode: string) {
    return this.modelClass.query().findOne({ barcode })
  }

  async create (props: Partial<ProductModel>) {
    props.colors = JSON.stringify(props.colors)
    props.sizes = JSON.stringify(props.sizes)

    return this.modelClass
      .query()
      .insert(props)
      .returning('*')
  }

  update (id: number, props: Partial<ProductModel>) {
    props.colors = JSON.stringify(props.colors)
    props.sizes = JSON.stringify(props.sizes)

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
