import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from 'src/types/enums/role';

@Injectable()
export class OwnUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.userId;
    const phoneNumber = request.params.phoneNumber;

    const token = request.headers.authorization.split(' ')[1];
    const decoded = request.user;

    if (decoded.role === Role.ADMIN) {
      return true;
    }

    if (decoded.userId === userId) {
      return true;
    }

    if (decoded.phoneNumber === phoneNumber) {
      return true;
    }

    return false;
  }
}
