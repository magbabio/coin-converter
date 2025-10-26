import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class UserOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const paramUserId = request.params.id;

    if (user.role === Role.ADMIN || user.userId === paramUserId) {
      return true;
    }

    throw new ForbiddenException('Access denied');
  }
}
