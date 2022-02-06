import { Global, Module } from '@nestjs/common'
import * as Knex from 'knex'
import { knexSnakeCaseMappers, Model } from 'objection'
import { TagModel } from './models/tag.model'
import { NoteModel } from './models/note.model'
import { ThemeModel } from './models/theme.model'
import { NoteTagModel } from './models/note-tag.model'
import { UserModel } from './models/user.model'
import { ColorModel } from './models/color.model'
import { SizeModel } from './models/size.model'
import { CategoryModel } from './models/category.model'
import { ProductModel } from './models/product.model'
import { VariantProductModel } from './models/variant_product.model'
import { ImageModel } from './models/image.model'
import { OrderModel } from './models/order.model'
import { OrderItemModel } from './models/order_item.model'
import { CustomerModel } from './models/customer.model'

const models = [
  TagModel,
  NoteModel,
  ThemeModel,
  NoteTagModel,
  UserModel,
  ColorModel,
  SizeModel,
  CategoryModel,
  ProductModel,
  VariantProductModel,
  ImageModel,
  OrderModel,
  OrderItemModel,
  CustomerModel
]

const modelProviders = models.map(model => {
  return {
    provide: model.name,
    useValue: model,
  }
})

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = Knex({
        client: 'pg',
        connection: {
          database: 'account',
          user: 'dbuser',
          password: null,
        },
        debug: process.env.KNEX_DEBUG === 'true',
        ...knexSnakeCaseMappers(),
      })

      Model.knex(knex)
      return knex
    },
  },
]

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
