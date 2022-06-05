import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common/common.module'
import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CommonModule],
  exports: [CategoriesService],
})
export class CategoriesModule {}
