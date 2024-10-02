import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CartModule,
  CustomerModule,
  DriverModule,
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
    DriverModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
