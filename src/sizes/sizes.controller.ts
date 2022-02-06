import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { SizeModel } from 'src/database/models/size.model'
import { SizesService } from './sizes.service'

@Controller('sizes')
export class SizesController {
  constructor (private sizesService: SizesService) {}

  @Get()
  async findAll (
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.sizesService.findAll(page, limit, search)
  }

  @Get('list')
  async list (@Query('search') search?: string) {
    return this.sizesService.list(search)
  }

  @Get(':id')
  async findOne (@Param('id', new ParseIntPipe()) id: number) {
    return this.sizesService.findOneById(id)
  }

  @Post()
  async create (@Body() props: Partial<SizeModel>) {
    return this.sizesService.create(props)
  }

  @Delete(':id')
  async delete (@Param('id', new ParseIntPipe()) id: number) {
    return this.sizesService.delete(id)
  }

  @Put(':id')
  async update (
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: Partial<SizeModel>,
  ) {
    return this.sizesService.update(id, props)
  }
}
