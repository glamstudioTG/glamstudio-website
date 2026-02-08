import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OverrideHoursController } from './override-hours.controller';
import { OverrideHoursService } from './override-hours.service';

@Module({
  imports: [PrismaModule],
  controllers: [OverrideHoursController],
  providers: [OverrideHoursService],
  exports: [OverrideHoursService],
})
export class OverrideHoursModule {}
