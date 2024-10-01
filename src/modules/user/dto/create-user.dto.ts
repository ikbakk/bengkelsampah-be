import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Role } from 'src/types/enums/role';

export class CreateUserDto {
  // @IsEmail()
  // email: string;
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role; // Add role for the user
}
