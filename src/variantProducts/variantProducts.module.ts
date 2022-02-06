import { Module } from '@nestjs/common'
import { VariantProductsController } from './variantProducts.controller'
import { VariantProductsService } from './variantProducts.service'

@Module({
  controllers: [VariantProductsController],
  providers: [VariantProductsService],
  exports: [VariantProductsService],
})
export class VariantProductsModule {}
