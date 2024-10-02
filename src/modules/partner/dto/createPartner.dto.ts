import { IsString } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  businessName: string;

  @IsString()
  registrationNumber: string;

  @IsString()
  userId: string;
}
