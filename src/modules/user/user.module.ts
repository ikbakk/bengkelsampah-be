import { Module } from '@nestjs/common';
import { CartModule } from '../cart/cart.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [CartModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
