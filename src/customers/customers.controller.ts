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
import { CustomerModel } from 'src/database/models/customer.model'
import { CustomersService } from './customers.service'

@Controller('customers')
export class CustomersController {
  constructor (private customersService: CustomersService) {}

  @Get()
  async findAll (
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.customersService.findAll(page, limit, search)
  }

  @Get('list')
  async list (@Query('search') search?: string) {
    return this.customersService.list(search)
  }

  @Get(':id')
  async findOne (@Param('id', new ParseIntPipe()) id: number) {
    return this.customersService.findOneById(id)
  }

  @Post()
  async create (@Body() props: Partial<CustomerModel>) {
    return this.customersService.create(props)
  }

  @Delete(':id')
  async delete (@Param('id', new ParseIntPipe()) id: number) {
    return this.customersService.delete(id)
  }

  @Put(':id')
  async update (
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: Partial<CustomerModel>,
  ) {
    return this.customersService.update(id, props)
  }
}
