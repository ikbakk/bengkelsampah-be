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
} from './modules';

@Module({
  imports: [
    GLobalJwtModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    CustomerModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
