import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [CartModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
