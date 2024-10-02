import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PartnerService } from './partner.service';
import { CreatePartnerDto } from './dto/createPartner.dto';
import { UpdatePartnerDto } from './dto/updatePartner.dto';

@Controller('partner')
export class PartnerController {
  constructor(private partnerService: PartnerService) {}

  @Post()
  async create(@Body() createPartnerDto: CreatePartnerDto) {
    return await this.partnerService.create(createPartnerDto);
  }

  @Get()
  async findAll() {
    return await this.partnerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.partnerService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePartnerDto: UpdatePartnerDto,
  ) {
    return await this.partnerService.update(id, updatePartnerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.partnerService.remove(id);
  }
}
