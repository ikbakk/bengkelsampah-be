import { IsOptional, IsString } from 'class-validator';

export class UpdatePartnerDto {
  @IsString()
  @IsOptional()
  businessName: string;

  @IsString()
  @IsOptional()
  registrationNumber: string;
}
