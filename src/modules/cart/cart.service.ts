import { Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async createCart(userId: string): Promise<Cart> {
    return this.prisma.cart.create({
      data: {
        userId,
      },
    });
  }
}
