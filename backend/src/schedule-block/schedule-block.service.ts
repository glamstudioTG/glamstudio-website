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
import { TimeService } from 'src/time/time.service';

@Injectable()
export class ScheduleBlockService {
  constructor(
    private prisma: PrismaService,
    private timeService: TimeService,
  ) {}

  async create(dto: CreateScheduleBlockDto, workerId?: string) {
    const dateUtc = this.timeService.toUtc(dto.date);
    const { startUtc, endUtc } = this.timeService.getDayBounds(dateUtc);

    let startTime: number | null = null;
    let endTime: number | null = null;

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
        date: {
          gte: startUtc,
          lte: endUtc,
        },
      },
    });

    if (startTime === null && endTime === null) {
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
        date: dateUtc,
        startTime,
        endTime,
        reason: dto.reason,
      },
    });
  }

  async getByDate(date: string, workerId?: string) {
    const dateUtc = this.timeService.toUtc(date);
    const { startUtc, endUtc } = this.timeService.getDayBounds(dateUtc);

    return this.prisma.scheduleBlock.findMany({
      where: {
        workerId: workerId ?? null,
        date: {
          gte: startUtc,
          lte: startUtc,
        },
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async getAllByWorker(workerId: string) {
    return this.prisma.scheduleBlock.findMany({
      where: { workerId },
      orderBy: { date: 'desc' },
    });
  }

  async delete(id: string, workerId: string) {
    const block = await this.prisma.scheduleBlock.findUnique({
      where: { id },
    });

    if (!block || block.workerId !== (workerId ?? null)) {
      throw new NotFoundException('Block not found');
    }

    return this.prisma.scheduleBlock.delete({ where: { id } });
  }

  async deleteGlobalBlock(id: string) {
    const block = await this.prisma.scheduleBlock.findUnique({
      where: { id },
    });

    if (!block || block.workerId !== null) {
      throw new NotFoundException('Global block not found');
    }

    return this.prisma.scheduleBlock.delete({ where: { id } });
  }

  async getGlobalByDate(date: string) {
    const dateUtc = this.timeService.toUtc(date);
    const { startUtc, endUtc } = this.timeService.getDayBounds(dateUtc);
    return this.prisma.scheduleBlock.findMany({
      where: {
        workerId: null,
        date: {
          gte: startUtc,
          lte: endUtc,
        },
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async getAllGlobal() {
    return this.prisma.scheduleBlock.findMany({
      where: {
        workerId: null,
      },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    });
  }
}
