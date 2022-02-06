import { Inject, Injectable } from '@nestjs/common'
import { ModelClass, transaction } from 'objection'
import { query } from '../auth/constants'
import { ColorModel } from 'src/database/models/color.model'

@Injectable()
export class ColorsService {
  constructor (
    @Inject('ColorModel') private modelClass: ModelClass<ColorModel>,
  ) {}

  findAll (page: number, limit: number, search: string) {
    let pageNo = page ? page : query.page
    let pageLimit = limit ? limit : query.limit

    search = search ? '%' + search + '%' : ''

    if (search == '') {
      return this.modelClass
        .query()
        .select('id', 'name', 'slug')
        .page(pageNo - 1, pageLimit)
    }

    return this.modelClass
      .query()
      .select('id', 'name', 'slug')
      .page(pageNo - 1, pageLimit)
      .where('name', 'like', search)
      .orWhere('slug', 'like', search)
  }

  list (search: string) {
    search = search ? '%' + search + '%' : ''

    if (search == '') {
      return this.modelClass
        .query()
        .select('id', 'name as label', 'slug')
      }

    return this.modelClass
      .query()
      .select('id', 'name as label', 'slug')
      .where('name', 'like', search)
      .orWhere('slug', 'like', search)
  }

  findOneById (id: number) {
    return this.modelClass
      .query()
      .select('id', 'name', 'slug')
      .findById(id)
  }

  findOne (slug: string) {
    return this.modelClass.query().findOne({ slug })
  }

  async create (props: Partial<ColorModel>) {
    return this.modelClass
      .query()
      .insert(props)
      .returning('*')
  }

  update (id: number, props: Partial<ColorModel>) {
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
