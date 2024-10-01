import { IsNumber, IsOptional } from 'class-validator';

export class UpdateCartItemDto {
  @IsNumber()
  @IsOptional()
  cartId?: number;

  @IsNumber()
  @IsOptional()
  productId?: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;
}
