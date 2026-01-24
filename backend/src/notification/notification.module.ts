import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GoogleCalendarService } from 'src/calendar/google-calendar.service';
import { GoogleCalendarListener } from 'src/calendar/google-calendar.listener';
import { EmailService } from './email.service';
import { NotificationListener } from './notification.listener';

@Module({
  imports: [PrismaModule],
  providers: [
    GoogleCalendarService,
    GoogleCalendarListener,
    EmailService,
    NotificationListener,
  ],
})
export class NotificationModule {}
