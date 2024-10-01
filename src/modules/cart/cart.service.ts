import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cart } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartItemDto } from './dto/createCartItem.dto';

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
        cartItems: {
          select: {
            waste: {
              select: {
                name: true,
                price: true,
                type: true,
                unit: true,
              },
            },
            price: true,
            quantity: true,
            createdAt: true,
          },
        },
      },
    });

    return cartItems.cartItems;
  }

  async addItemToCart(userId: string, createCartItemDto: CreateCartItemDto) {
    const [user, userCart, waste] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.cart.findUnique({ where: { userId } }),
      this.prisma.waste.findUnique({
        where: { id: createCartItemDto.wasteId },
      }),
    ]);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!userCart) {
      throw new NotFoundException('Cart not found');
    }

    if (!waste) {
      throw new NotFoundException('Waste not found');
    }

    const existingCartItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        wasteId: createCartItemDto.wasteId,
      },
    });

    if (existingCartItem) {
      throw new BadRequestException('Item already in cart');
    }

    const newCartItem = await this.prisma.cartItem.create({
      data: {
        ...createCartItemDto,
        cartId: userCart.id,
        price: waste.price * createCartItemDto.quantity,
      },
      select: {
        waste: {
          select: {
            name: true,
            price: true,
            type: true,
            unit: true,
          },
        },
        createdAt: true,
        price: true,
        quantity: true,
      },
    });

    return newCartItem;
  }

  async updateUserCart(userId: string, cartItems: any) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUserCart = await this.prisma.cart.update({
      where: {
        userId,
      },
      data: {
        cartItems,
      },
    });

    return updatedUserCart;
  }
}
