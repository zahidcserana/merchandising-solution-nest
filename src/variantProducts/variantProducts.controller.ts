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
} from '@nestjs/common';
import { VariantProductModel } from 'src/database/models/variant_product.model';
import { VariantProductsService } from './variantProducts.service';
import { Request } from 'express';

@Controller('variant_products')
export class VariantProductsController {
  constructor(private variantProductsService: VariantProductsService) {}

  @Get()
  findAll(@Req() request: Request) {
    return this.variantProductsService.findAll(request);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.variantProductsService.findOneById(id);
  }

  @Post()
  async create(@Body() props: Partial<VariantProductModel>) {
    return this.variantProductsService.create(props);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.variantProductsService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: Partial<VariantProductModel>,
  ) {
    return this.variantProductsService.update(id, props);
  }
}
