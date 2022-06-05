import { CommonModule } from '../common/common.module';
import { Module } from '@nestjs/common';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';

@Module({
  controllers: [ColorsController],
  providers: [ColorsService, CommonModule],
  exports: [ColorsService],
})
export class ColorsModule {}
