import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtGuard } from '../guards/jwt/jwt.guard';
import { OwnUserGuard } from '../guards/ownUser/ownUser.guard';
import { CreateCartItemDto } from './dto/createCartItem.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get(':userId')
  @UseGuards(JwtGuard, OwnUserGuard)
  async getCartByUserId(@Param('userId') userId: string) {
    return await this.cartService.findUserCart(userId);
  }

  @Post(':userId')
  @UseGuards(JwtGuard, OwnUserGuard)
  async addItemToCart(
    @Param('userId') userId: string,
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    return await this.cartService.addItemToCart(userId, createCartItemDto);
  }
}
