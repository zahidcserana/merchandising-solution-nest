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
import { VariantProductModel } from 'src/database/models/variant_product.model'
import { VariantProductsService } from './variantProducts.service'

@Controller('variant_products')
export class VariantProductsController {
  constructor (private variantProductsService: VariantProductsService) {}

  @Get()
  async findAll (
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.variantProductsService.findAll(page, limit, search)
  }

  @Get(':id')
  async findOne (@Param('id', new ParseIntPipe()) id: number) {
    return this.variantProductsService.findOneById(id)
  }

  @Post()
  async create (@Body() props: Partial<VariantProductModel>) {
    return this.variantProductsService.create(props)
  }

  @Delete(':id')
  async delete (@Param('id', new ParseIntPipe()) id: number) {
    return this.variantProductsService.delete(id)
  }

  @Put(':id')
  async update (
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: Partial<VariantProductModel>,
  ) {
    return this.variantProductsService.update(id, props)
  }
}
