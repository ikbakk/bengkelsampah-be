import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { TransactionSource } from 'src/types/enums/transactionsSource';
import { UpdateTransactionStatusDto } from './dto/updateTransactionStatus.dto';

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartService,
  ) {}

  async createTransaction(
    userId: string,
    createTransaction: CreateTransactionDto,
  ) {
    const userCart = await this.cartService.findUserCart(userId);
    if (!userCart) {
      throw new Error('Cart not found');
    }

    const transaction = await this.prisma.transaction.create({
      data: {
        wasteBankId:
          createTransaction.source === TransactionSource.WASTE_BANK
            ? createTransaction.wasteBankId
            : '',
        source: createTransaction.source,
        userId,
        status: 'READY',
        wasteSubmissions: [],
      },
    });

    // Reset the cart
    await this.cartService.updateUserCart(userId, {
      cartItems: [],
      totalPrice: 0,
      totalQuantity: 0,
    });

    return transaction;
  }

  async getTransactions(userId: string) {
    return this.prisma.transaction.findMany({
      where: {
        userId,
      },
    });
  }

  async getTransaction(id: string) {
    return this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });
  }

  async updateTransactionStatus(
    id: string,
    updateTransactionStatus: UpdateTransactionStatusDto,
  ) {
    return this.prisma.transaction.update({
      where: {
        id,
      },
      data: {
        status: updateTransactionStatus.status,
      },
    });
  }
}
