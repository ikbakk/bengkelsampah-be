import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [DriverService, PrismaService],
  controllers: [DriverController],
})
export class DriverModule {}
