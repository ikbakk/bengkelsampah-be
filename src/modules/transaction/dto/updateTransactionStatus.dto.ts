import { IsEnum } from 'class-validator';
import { TransactionStatus } from 'src/types/enums/transactionStatus';

export class UpdateTransactionStatusDto {
  @IsEnum(TransactionStatus)
  status: TransactionStatus;
}
