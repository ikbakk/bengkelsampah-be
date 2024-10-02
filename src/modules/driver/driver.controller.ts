import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/createDriver.dto';
import { UpdateDriverDto } from './dto/updateDriver.dto';

@Controller('driver')
export class DriverController {
  constructor(private driverService: DriverService) {}

  @Post()
  async create(@Body() createDriverDto: CreateDriverDto) {
    return await this.driverService.create(createDriverDto);
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
