import { TransactionSource } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsEnum(TransactionSource)
  source: TransactionSource;

  @IsString()
  wasteBankId: string;
}
