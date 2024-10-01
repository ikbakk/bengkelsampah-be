import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Partner } from '../partner/partner.entity';
import { Customer } from '../customer/customer.entity';
import { Driver } from '../driver/driver.entity';
import { Member } from '../member/member.entity';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    CartModule,
    // TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
