import { IsOptional, IsString } from 'class-validator';

export class UpdateWasteBankDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
