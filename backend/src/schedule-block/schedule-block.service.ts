import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateScheduleBlockDto } from './dto/create-schedule-block.dto';
import { hhmmToMinutes } from 'src/common/utils/time.utils';
import { rangesOverlap } from 'src/common/utils/rangeOverlap';
import { localDateToUtc } from 'src/common/utils/date.utils';

@Injectable()
export class ScheduleBlockService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateScheduleBlockDto, workerId?: string) {
    const date = localDateToUtc(dto.date);

    let startTime: number | null = null;
    let endTime: number | null = null;

    // 1️⃣ Validación de rango
    if (dto.startTime && dto.endTime) {
      startTime = hhmmToMinutes(dto.startTime);
      endTime = hhmmToMinutes(dto.endTime);

      if (startTime >= endTime) {
        throw new BadRequestException('Invalid block range');
      }
    }

    const existing = await this.prisma.scheduleBlock.findMany({
      where: {
        workerId: workerId ?? null,
        date,
      },
    });

    if (startTime === null && endTime === null) {
      // Bloqueo de día completo
      if (existing.length > 0) {
        throw new ConflictException('Day already has blocks');
      }
    } else {
      if (
        existing.some(
          (b) =>
            b.startTime === null ||
            rangesOverlap(startTime!, endTime!, b.startTime!, b.endTime!),
        )
      ) {
        throw new ConflictException('Block overlaps existing block');
      }
    }

    return this.prisma.scheduleBlock.create({
      data: {
        workerId: workerId ?? null,
        date,
        startTime,
        endTime,
        reason: dto.reason,
      },
    });
  }

  async getByDate(date: string, workerId?: string) {
    const d = localDateToUtc(date);

    return this.prisma.scheduleBlock.findMany({
      where: {
        workerId: workerId ?? null,
        date: d,
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async delete(id: string, workerId?: string) {
    const block = await this.prisma.scheduleBlock.findUnique({
      where: { id },
    });

    if (!block || block.workerId !== (workerId ?? null)) {
      throw new NotFoundException('Block not found');
    }

    return this.prisma.scheduleBlock.delete({ where: { id } });
  }
}
