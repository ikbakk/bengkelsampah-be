import { IsEnum, IsString } from 'class-validator';
import { DriverStatus } from 'src/types/enums/driverStatus';

export class CreateDriverDto {
  @IsEnum(DriverStatus)
  driverStatus: DriverStatus;

  @IsString()
  userId: string;
}
