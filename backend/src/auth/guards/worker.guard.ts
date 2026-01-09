import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthUser } from '../types/auth-user.type';
import { Role } from '@prisma/client';

@Injectable()
export class WorkerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user: AuthUser | undefined = req.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado.');
    }

    if (user.role !== Role.WORKER) {
      throw new ForbiddenException(
        'Acceso denegado. Solo trabajadores pueden realizar esta acción.',
      );
    }

    return true;
  }
}
