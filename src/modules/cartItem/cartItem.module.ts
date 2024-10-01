import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CartItemService } from './cartItem.service';

@Module({
  imports: [PrismaModule],
  providers: [CartItemService],
  exports: [CartItemService],
})
export class CartItemModule {}
