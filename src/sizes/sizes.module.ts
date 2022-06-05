import { CommonModule } from './../common/common.module';
import { Module } from '@nestjs/common'
import { SizesController } from './sizes.controller'
import { SizesService } from './sizes.service'

@Module({
  controllers: [SizesController],
  providers: [SizesService, CommonModule],
  exports: [SizesService],
})
export class SizesModule {}
