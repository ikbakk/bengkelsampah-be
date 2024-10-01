import { Injectable } from '@nestjs/common';
import { Role } from 'src/types/enums/role';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllWithCustomerRole() {
    return await this.prismaService.user.findMany({
      where: {
        role: Role.CUSTOMER,
      },
      include: {
        cart: {
          include: {
            cartItems: true,
          },
        },
      },
    });
  }

  async getOne(phoneNumber: string) {
    return await this.prismaService.user.findUnique({
      where: {
        phoneNumber,
      },
      include: {
        cart: {
          include: {
            cartItems: true,
          },
        },
      },
    });
  }
}
