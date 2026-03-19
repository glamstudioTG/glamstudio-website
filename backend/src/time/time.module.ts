import { Module, Global } from '@nestjs/common';
import { TimeService } from './time.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [TimeService],
  exports: [TimeService],
})
export class TimeModule {}
