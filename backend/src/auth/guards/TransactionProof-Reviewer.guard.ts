import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionProofReviewerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    if (user.role === 'ADMIN') {
      return true;
    }

    const proofId = req.params.id;
    if (!proofId) {
      throw new ForbiddenException('proofId no proporcionado');
    }

    const proof = await this.prisma.transactionProof.findUnique({
      where: { id: proofId },
      include: {
        booking: {
          select: {
            worker: {
              select: { userId: true },
            },
          },
        },
      },
    });

    if (!proof) {
      throw new ForbiddenException('Comprobante no encontrado');
    }

    if (proof.booking.worker.userId !== user.sub) {
      throw new ForbiddenException(
        'No tienes permiso para revisar este comprobante',
      );
    }

    return true;
  }
}
