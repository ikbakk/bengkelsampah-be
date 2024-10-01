import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('JwtGuard: canActivate called');

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const token = request.headers.authorization.split(' ')[1];
    if (!token) {
      console.log('JwtGuard: No token provided');
      return false;
    }

    try {
      const decoded = await this.jwtService.verify(token);
      console.log('JwtGuard: Token verified successfully');
      request.user = decoded;
      return true;
    } catch (error) {
      console.log('JwtGuard: Error verifying token', error);
      return false;
    }
  }
}
