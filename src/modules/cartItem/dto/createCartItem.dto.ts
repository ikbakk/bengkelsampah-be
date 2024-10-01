import { IsNumber, IsString } from 'class-validator';

export class CreateCartItemDto {
  @IsString()
  cartId: string;

  @IsString()
  wasteId: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}
