import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CategoriesModule } from './categories/categories.module'
import { ColorsModule } from './colors/colors.module'
import { TransformInterceptor } from './common/interceptor/transform.interceptor'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { CustomersModule } from './customers/customers.module'
import { DatabaseModule } from './database/database.module'
import { NotesModule } from './notes/notes.module'
import { OrdersModule } from './orders/orders.module'
import { ProductsModule } from './products/products.module'
import { SizesModule } from './sizes/sizes.module'
import { TagsModule } from './tags/tags.module'
import { ThemesModule } from './themes/themes.module'
import { UsersModule } from './users/users.module'
import { VariantProductsModule } from './variantProducts/variantProducts.module'

@Module({
  imports: [
    TagsModule,
    ThemesModule,
    NotesModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    ColorsModule,
    SizesModule,
    CategoriesModule,
    ProductsModule,
    VariantProductsModule,
    OrdersModule,
    CustomersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'api/auth/login', method: RequestMethod.POST })
      .forRoutes('*')
  }
}
