import { IsString } from 'class-validator';

export class UpdateDriverDto {
  @IsString()
  driverStatus: string;
}
