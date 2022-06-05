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
import { ColorModel } from 'src/database/models/color.model'
import { CategoriesService } from './categories.service'

@Controller('categories')
export class CategoriesController {
  constructor (private categoriesService: CategoriesService) {}

  @Get()
  async findAll (
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.categoriesService.findAll(page, limit, search)
  }

  @Get('list')
  async list (@Query('search') search?: string) {
    return this.categoriesService.list(search)
  }

  @Get(':id')
  async findOne (@Param('id', new ParseIntPipe()) id: number) {
    return this.categoriesService.findOneById(id)
  }

  @Post()
  async create (@Body() props: Partial<ColorModel>) {
    return this.categoriesService.create(props)
  }

  @Delete(':id')
  async delete (@Param('id', new ParseIntPipe()) id: number) {
    return this.categoriesService.delete(id)
  }

  @Put(':id')
  async update (
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: Partial<ColorModel>,
  ) {
    return this.categoriesService.update(id, props)
  }
}
