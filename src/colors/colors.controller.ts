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
import { ColorsService } from './colors.service'

@Controller('colors')
export class ColorsController {
  constructor (private colorsService: ColorsService) {}

  @Get()
  async findAll (
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.colorsService.findAll(page, limit, search)
  }

  @Get('list')
  async list (@Query('search') search?: string) {
    return this.colorsService.list(search)
  }

  @Get(':id')
  async findOne (@Param('id', new ParseIntPipe()) id: number) {
    return this.colorsService.findOneById(id)
  }

  @Post()
  async create (@Body() props: Partial<ColorModel>) {
    return this.colorsService.create(props)
  }

  @Delete(':id')
  async delete (@Param('id', new ParseIntPipe()) id: number) {
    return this.colorsService.delete(id)
  }

  @Put(':id')
  async update (
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: Partial<ColorModel>,
  ) {
    return this.colorsService.update(id, props)
  }
}
