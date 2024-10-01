import { IsNumber, IsString } from 'class-validator';

export class CreateCartItemDto {
  @IsString()
  wasteId: string;

  @IsNumber()
  quantity: number;
}
