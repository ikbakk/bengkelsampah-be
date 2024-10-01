import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWasteDto } from './dto/createWaste.dto';
import { UpdateWasteDto } from './dto/updateWaste.dto';

@Injectable()
export class WasteService {
  constructor(private prismaService: PrismaService) {}

  async create(createWasteDto: CreateWasteDto) {
    return await this.prismaService.waste.create({
      data: createWasteDto,
    });
  }

  async findAll() {
    return await this.prismaService.waste.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.waste.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateWasteDto: UpdateWasteDto) {
    return await this.prismaService.waste.update({
      where: {
        id,
      },
      data: updateWasteDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.waste.delete({
      where: {
        id,
      },
    });
  }
}
