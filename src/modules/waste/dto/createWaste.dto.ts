import { WasteType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWasteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsEnum(WasteType)
  @IsNotEmpty()
  type: WasteType;

  @IsString()
  @IsNotEmpty()
  unit: string;
}
