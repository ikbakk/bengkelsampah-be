import { IsString, IsNumber } from 'class-validator';

export class UpdateWasteDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  wasteType: string;

  @IsString()
  unit: string;
}
