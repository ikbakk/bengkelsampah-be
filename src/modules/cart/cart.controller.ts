import { Controller, Get, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get(':userId')
  async getCartByUserId(@Param('userId') userId: string) {
    return await this.cartService.findUserCart(userId);
  }
}
