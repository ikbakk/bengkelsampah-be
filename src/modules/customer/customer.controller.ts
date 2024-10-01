import { Controller, Get, Param, Patch, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getAll() {
    return await this.customerService.getAllWithCustomerRole();
  }

  @Get(':phoneNumber')
  async getOne(@Param('phoneNumber') phoneNumber: string) {
    return await this.customerService.getOne(phoneNumber);
  }
}
