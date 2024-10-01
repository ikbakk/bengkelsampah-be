import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtGuard } from '../guards/jwt/jwt.guard';
import { OwnUserGuard } from '../guards/ownUser/ownUser.guard';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get(':userId')
  @UseGuards(JwtGuard, OwnUserGuard)
  async getCartByUserId(@Param('userId') userId: string) {
    return await this.cartService.findUserCart(userId);
  }
}
