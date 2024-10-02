import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartnerDto } from './dto/createPartner.dto';
import { UpdatePartnerDto } from './dto/updatePartner.dto';

@Injectable()
export class PartnerService {
  constructor(private prismaService: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto) {
    return await this.prismaService.partner.create({
      data: {
        businessName: createPartnerDto.businessName,
        registrationNumber: createPartnerDto.registrationNumber,
        userId: createPartnerDto.userId,
      },
    });
  }

  async findAll() {
    return await this.prismaService.partner.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.partner.findUnique({
      where: { id },
    });
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    return await this.prismaService.partner.update({
      where: { id },
      data: updatePartnerDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.partner.delete({
      where: { id },
    });
  }
}
