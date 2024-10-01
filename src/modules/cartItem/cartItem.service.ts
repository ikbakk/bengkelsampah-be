import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCartItemDto } from './dto/updateCartItem.dto';
import { CreateCartItemDto } from './dto/createCartItem.dto';

@Injectable()
export class CartItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.cartItem.findMany();
  }

  async create(createCartItemDto: CreateCartItemDto) {
    return await this.prismaService.cartItem.create({
      data: {
        cartId: createCartItemDto.cartId,
        wasteId: createCartItemDto.wasteId,
        price: createCartItemDto.price || 0,
        quantity: createCartItemDto.quantity || 0,
      },
    });
  }

  async updateQuantity(id: string, quantity: number) {
    return await this.prismaService.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
    });
  }
  //
  // async update(id: number, updateCartItemDto: UpdateCartItemDto) {
  //   return await this.prismaService.cartItem.update({
  //     where: {
  //       id,
  //     },
  //     data: updateCartItemDto,
  //   });
  // }
  //
  // async delete(id: number) {
  //   return await this.prismaService.cartItem.delete({
  //     where: {
  //       id,
  //     },
  //   });
  // }
}
