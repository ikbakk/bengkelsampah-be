import { Module } from '@nestjs/common';
import { WasteService } from './waste.service';
import { WasteController } from './waste.controller';

@Module({
  providers: [WasteService],
  controllers: [WasteController],
})
export class WasteModule {}
