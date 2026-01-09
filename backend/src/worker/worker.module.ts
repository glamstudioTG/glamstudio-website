import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';

@Module({
  imports: [PrismaModule],
  controllers: [WorkerController],
  providers: [WorkerService],
  exports: [WorkerService],
})
export class WorkerModule {}
