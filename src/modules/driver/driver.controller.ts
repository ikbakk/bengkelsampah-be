import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/createDriver.dto';
import { UpdateDriverDto } from './dto/updateDriver.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Controller('drivers')
export class DriverController {
  constructor(private driverService: DriverService) {}

  @Post()
  async create(@Body() createDriverDto: CreateDriverDto) {
    try {
      await this.driverService.create(createDriverDto);
      return {
        message: 'User created successfully',
        statusCode: 201,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Phone number already exists');
      }

      throw new ExceptionsHandler();
    }
  }

  @Get()
  async findAll() {
    return await this.driverService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.driverService.findOne(id);
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateDriverDto: UpdateDriverDto,
  // ) {
  //   return await this.driverService.update(id, updateDriverDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.driverService.remove(id);
  }
}
