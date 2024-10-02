import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateDriverDto } from './dto/createDriver.dto';
import { Role } from 'src/types/enums/role';

@Injectable()
export class DriverService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    const user = await this.userService.create({
      role: Role.DRIVER,
      name: createDriverDto.name,
      address: createDriverDto.address,
      phoneNumber: createDriverDto.phoneNumber,
      password: createDriverDto.password,
    });

    return await this.prismaService.driver.create({
      data: {
        status: 'AVAILABLE',
        userId: user.id,
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
