import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminOrWorkerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    const workerId: string | undefined = req.params?.workerId;

    if (!workerId) {
      throw new ForbiddenException('workerId no proporcionado');
    }

    if (user.role === 'ADMIN') {
      return true;
    }

    if (user.role === 'WORKER') {
      const worker = await this.prisma.worker.findUnique({
        where: { id: workerId },
        select: { userId: true },
      });

      if (!worker) {
        throw new ForbiddenException('El worker no existe');
      }

      if (worker.userId !== user.sub) {
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
