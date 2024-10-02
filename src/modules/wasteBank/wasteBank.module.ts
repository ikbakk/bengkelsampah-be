import { Module } from '@nestjs/common';
import { WasteBankService } from './wasteBank.service';
import { WasteBankController } from './wasteBank.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [WasteBankService, PrismaService],
  controllers: [WasteBankController],
})
export class WasteBankModule {}
