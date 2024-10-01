import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../guards/jwt/jwt.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto);
      return {
        message: 'User created successfully',
        statusCode: 201,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Phone number already exists');
      }

      throw new ExceptionsHandler();
    }
  }

  @Post('auth/signin')
  async signin(@Body() loginUserDto: LoginUserDto) {
    const accessToken = await this.userService.login(loginUserDto);
    return {
      message: 'User logged in successfully',
      accessToken,
      statusCode: 200,
    };
  }

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Get(':phoneNumber')
  async findByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    return await this.userService.findByPhoneNumber(phoneNumber);
  }

  @Put('/edit/:phoneNumber')
  @UseGuards(JwtGuard)
  async edit(
    @Param('phoneNumber') phoneNumber: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.edit(phoneNumber, updateUserDto);
  }
}
