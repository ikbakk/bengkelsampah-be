import { IsNumber, IsOptional } from 'class-validator';

export class UpdateCartItemDto {
  @IsNumber()
  @IsOptional()
  wasteId?: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;
}
