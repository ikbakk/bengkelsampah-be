import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWasteBankDto } from './dto/createWasteBank.dto';
import { UpdateWasteBankDto } from './dto/updateWasteabank.dto';

@Injectable()
export class WasteBankService {
  constructor(private prismaService: PrismaService) {}

  async create(createWasteBankDto: CreateWasteBankDto) {
    return await this.prismaService.wasteBank.create({
      data: createWasteBankDto,
    });
  }

  async findAll() {
    return await this.prismaService.wasteBank.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.wasteBank.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateWasteBankDto: UpdateWasteBankDto) {
    return await this.prismaService.wasteBank.update({
      where: { id },
      data: updateWasteBankDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.wasteBank.delete({
      where: { id },
    });
  }
}
