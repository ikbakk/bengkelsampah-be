import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateDriverDto } from './dto/updateDriver.dto';
import { CreateDriverDto } from './dto/createDriver.dto';

@Injectable()
export class DriverService {
  constructor(private prismaService: PrismaService) {}

  async create(createDriverDto: CreateDriverDto) {
    return await this.prismaService.driver.create({
      data: {
        status: 'AVAILABLE',
        userId: createDriverDto.userId,
      },
    });
  }

  async findAll() {
    return await this.prismaService.driver.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.driver.findUnique({
      where: { id },
    });
  }

  // async update(id: string, updateDriverDto: UpdateDriverDto) {
  //   return await this.prismaService.driver.update({
  //     where: { id },
  //     data: updateDriverDto,
  //   });
  // }

  async remove(id: string) {
    return await this.prismaService.driver.delete({
      where: { id },
    });
  }
}
