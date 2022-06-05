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
  Req,
  UseInterceptors,
} from '@nestjs/common'
import { ProductModel } from 'src/database/models/product.model'
import { ProductsService } from './products.service'
import { Request } from 'express';

@Controller('products')
export class ProductsController {
  constructor (private productsService: ProductsService) {}

  @Get()
  findAll(@Req() request: Request) {
    return this.productsService.findAll(request);
  }

  @Get('list')
  async list (@Query('search') search?: string, @Query('id') id?: number) {
    return this.productsService.list(search, id)
  }

  @Get(':id')
  async findOne (@Param('id', new ParseIntPipe()) id: number) {
    return this.productsService.findOneById(id)
  }

  @Post()
  async create (@Body() props: Partial<ProductModel>) {
    return this.productsService.create(props)
  }

  @Delete(':id')
  async delete (@Param('id', new ParseIntPipe()) id: number) {
    return this.productsService.delete(id)
  }

  @Put(':id')
  async update (
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: Partial<ProductModel>,
  ) {
    return this.productsService.update(id, props)
  }
}
