import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CartModule,
  CustomerModule,
  GLobalJwtModule,
  PrismaModule,
  UserModule,
  WasteModule,
} from './modules';

@Module({
  imports: [
    GLobalJwtModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    CustomerModule,
    CartModule,
    WasteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
