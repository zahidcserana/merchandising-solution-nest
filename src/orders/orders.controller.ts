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
} from '@nestjs/common'
import { OrderModel } from 'src/database/models/order.model'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
  constructor (private ordersService: OrdersService) {}

  @Get()
  async findAll (
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.ordersService.findAll(page, limit, search)
  }

  @Get('list')
  async list (@Query('search') search?: string) {
    return this.ordersService.list(search)
  }

  @Get(':id')
  async findOne (@Param('id', new ParseIntPipe()) id: number) {
    return this.ordersService.findOneById(id)
  }

  @Post()
  async create (@Body() props: Partial<OrderModel>) {
    return this.ordersService.create(props)
  }

  @Delete(':id')
  async delete (@Param('id', new ParseIntPipe()) id: number) {
    return this.ordersService.delete(id)
  }

  @Put(':id')
  async update (
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: Partial<OrderModel>,
  ) {
    return this.ordersService.update(id, props)
  }
}
