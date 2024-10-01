import {
  ConflictException,
  NotFoundException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        address: createUserDto.address,
        role: createUserDto.role || 'CUSTOMER',
        phoneNumber: createUserDto.phoneNumber,
        passwordHash: hashedPassword,
      },
    });

    await this.cartService.createCart(user.id);

    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { phoneNumber: loginUserDto.phoneNumber },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(
      loginUserDto.password,
      user.passwordHash,
    );
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { userId: user.id, phoneNumber: user.phoneNumber };
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }
}

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//     private readonly jwtService: JwtService,
//   ) {}
//
//   async create(createUserDto: CreateUserDto): Promise<User> {
//     const { phoneNumber, password } = createUserDto;
//
//     // Check if the user already exists
//     const existingUser = await this.userRepository.findOne({
//       where: { phoneNumber },
//     });
//     if (existingUser) {
//       throw new ConflictException('User with this email already exists');
//     }
//
//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);
//
//     const user = this.userRepository.create({
//       phoneNumber,
//       passwordHash: hashedPassword,
//     });
//
//     return await this.userRepository.save(user);
//   }
//
//   async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
//     const { phoneNumber, password } = loginUserDto;
//
//     const user = await this.userRepository.findOne({ where: { phoneNumber } });
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }
//
//     const isMatch = await bcrypt.compare(password, user.passwordHash);
//     if (!isMatch) {
//       throw new ConflictException('Invalid credentials');
//     }
//
//     const payload = { userId: user.userID, phoneNumber: user.phoneNumber };
//     const accessToken = this.jwtService.sign(payload);
//
//     return { accessToken };
//   }
// }
