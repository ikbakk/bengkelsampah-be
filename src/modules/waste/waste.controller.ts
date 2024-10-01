import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WasteService } from './waste.service';
import { CreateWasteDto } from './dto/createWaste.dto';
import { UpdateWasteDto } from './dto/updateWaste.dto';

@Controller('wastes')
export class WasteController {
  constructor(private readonly wasteService: WasteService) {}

  @Post()
  create(@Body() createWasteDto: CreateWasteDto) {
    return this.wasteService.create(createWasteDto);
  }

  @Get()
  findAll() {
    return this.wasteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wasteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWasteDto: UpdateWasteDto) {
    return this.wasteService.update(id, updateWasteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wasteService.remove(id);
  }
}
