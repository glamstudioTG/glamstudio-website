import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOverrideHoursDto } from './dto/create-override-hours.dto';
import { localDateToUtc } from 'src/common/utils/date.utils';
import { hhmmToMinutes } from 'src/common/utils/time.utils';
import { TimeService } from 'src/time/time.service';

@Injectable()
export class OverrideHoursService {
  constructor(
    private prisma: PrismaService,
    private timeService: TimeService,
  ) {}

  async create(workerId: string, dto: CreateOverrideHoursDto) {
    const dateUtc = this.timeService.toUtc(dto.date);
    const { startUtc, endUtc } = this.timeService.getDayBounds(dateUtc);
    const start = hhmmToMinutes(dto.startTime);
    const end = hhmmToMinutes(dto.endTime);

    if (start >= end) throw new BadRequestException('Invalid value');

    const existing = await this.prisma.overrideHours.findMany({
      where: { workerId, date: { gte: startUtc, lte: endUtc } },
    });
    if (existing.length > 0)
      throw new ConflictException('Override for that day already exists');

    return this.prisma.overrideHours.create({
      data: {
        workerId,
        date: dateUtc,
        startTime: start,
        endTime: end,
      },
    });
  }

  async getByDate(workerId: string, date: string) {
    const dateUtc = this.timeService.toUtc(date);
    const { startUtc, endUtc } = this.timeService.getDayBounds(dateUtc);
    return this.prisma.overrideHours.findMany({
      where: { workerId, date: { gte: startUtc, lte: endUtc } },
    });
  }

  async getAllByWorker(workerId: string) {
    return this.prisma.overrideHours.findMany({
      where: { workerId },
      orderBy: { date: 'desc' },
    });
  }

  async delete(workerId: string, id: string) {
    const override = await this.prisma.overrideHours.findUnique({
      where: { id },
    });

    if (!override || override.workerId !== workerId) {
      throw new NotFoundException('Override not found for this worker');
    }

    return this.prisma.overrideHours.delete({
      where: { id },
    });
  }
}
