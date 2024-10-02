import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { WasteBankService } from './wasteBank.service';
import { CreateWasteBankDto } from './dto/createWasteBank.dto';
import { UpdateWasteBankDto } from './dto/updateWasteabank.dto';

@Controller('waste-bank')
export class WasteBankController {
  constructor(private wasteBankService: WasteBankService) {}

  @Post()
  async create(@Body() createWasteBankDto: CreateWasteBankDto) {
    return await this.wasteBankService.create(createWasteBankDto);
  }

  @Get()
  async findAll() {
    return await this.wasteBankService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.wasteBankService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWasteBankDto: UpdateWasteBankDto,
  ) {
    return await this.wasteBankService.update(id, updateWasteBankDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.wasteBankService.remove(id);
  }
}
