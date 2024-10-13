import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { JwtGuard } from '../guards/jwt/jwt.guard';
import { OwnUserGuard } from '../guards/ownUser/ownUser.guard';
import { UpdateTransactionStatusDto } from './dto/updateTransactionStatus.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  @UseGuards(JwtGuard, OwnUserGuard)
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
    @Param('userId') userId: string,
  ) {
    return this.transactionService.createTransaction(
      userId,
      createTransactionDto,
    );
  }

  @Get()
  @UseGuards(JwtGuard, OwnUserGuard)
  async getTransactions(@Param('userId') userId: string) {
    return this.transactionService.getTransactions(userId);
  }

  @Get(':id')
  @UseGuards(JwtGuard, OwnUserGuard)
  async getTransaction(@Param('id') id: string) {
    return this.transactionService.getTransaction(id);
  }

  @Put(':id/status')
  @UseGuards(JwtGuard, OwnUserGuard)
  async updateTransactionStatus(
    @Param('id') id: string,
    @Body('status') status: UpdateTransactionStatusDto,
  ) {
    return this.transactionService.updateTransactionStatus(id, status.status);
  }
}
