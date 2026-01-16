import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminOrWorkerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    const workerIdFromParam: string | undefined = req.params?.workerId;

    if (!workerIdFromParam) {
      throw new ForbiddenException('workerId no proporcionado');
    }

    if (user.role === 'ADMIN') {
      return true;
    }

    if (user.role === 'WORKER') {
      if (!user.worker?.id) {
        throw new ForbiddenException('El usuario no tiene un worker asociado');
      }

      if (user.worker.id !== workerIdFromParam) {
        throw new ForbiddenException(
          'No tienes permisos para modificar este trabajador',
        );
      }

      return true;
    }

    throw new ForbiddenException(
      'No tienes permisos para realizar esta acción',
    );
  }
}
