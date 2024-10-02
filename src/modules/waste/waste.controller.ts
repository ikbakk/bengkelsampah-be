import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WasteService } from './waste.service';
import { CreateWasteDto } from './dto/createWaste.dto';
import { UpdateWasteDto } from './dto/updateWaste.dto';
import { JwtGuard } from '../guards/jwt/jwt.guard';
import { OwnUserGuard } from '../guards/ownUser/ownUser.guard';

@Controller('wastes')
export class WasteController {
  constructor(private readonly wasteService: WasteService) {}

  @Post()
  @UseGuards(JwtGuard, OwnUserGuard)
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
  @UseGuards(JwtGuard, OwnUserGuard)
  update(@Param('id') id: string, @Body() updateWasteDto: UpdateWasteDto) {
    return this.wasteService.update(id, updateWasteDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, OwnUserGuard)
  remove(@Param('id') id: string) {
    return this.wasteService.remove(id);
  }
}
