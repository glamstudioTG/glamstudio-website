import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/role.decorator';
import type { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado.');
    }

    
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        `No tienes permisos para acceder a esta ruta. Se requiere: ${requiredRoles.join(
          ', ',
        )}`,
      );
    }

    return true;
  }
}
