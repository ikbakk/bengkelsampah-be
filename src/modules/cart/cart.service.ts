import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findUserCart(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const cartItems = await this.prisma.cart.findFirst({
      where: {
        userId,
      },
      select: {
        cartItems: true,
      },
    });

    return cartItems.cartItems;
  }
}
