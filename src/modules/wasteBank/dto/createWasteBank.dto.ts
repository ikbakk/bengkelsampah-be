import { IsString } from 'class-validator';

export class CreateWasteBankDto {
  @IsString()
  name: string;

  @IsString()
  address: string;
}
