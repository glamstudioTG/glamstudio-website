import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthUser } from '../types/auth-user.type';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user: AuthUser | undefined = req.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado.');
    }

    if (user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'Acceso denegado. Solo administradores pueden realizar esta acción.',
      );
    }

    return true;
  }
}