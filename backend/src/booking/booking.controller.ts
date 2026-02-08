import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import type { JwtUserPayload } from 'src/auth/decorator/current-user.decorator';
import { OptionalJwtGuard } from 'src/auth/guards/optional-jwt.guard';
import { AdminOrWorkerGuard } from 'src/auth/guards/admin-or-worker.guard';
import { BookingResponseDto } from './dto/response-booking.dto';
import { GetWorkerBookingsDto } from './dto/get-worker-bookings.dto';

@Controller('/booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @UseGuards(JwtGuard, AdminOrWorkerGuard)
  @Get('worker/:workerId')
  getByWorker(
    @Param('workerId') workerId: string,
    @Query() filters: GetWorkerBookingsDto,
  ) {
    return this.bookingService.getByWorker(workerId, filters);
  }

  @UseGuards()
  @Get('by-date/:date')
  getByDate(@Param('date') date: string) {
    return this.bookingService.getByDate(date);
  }

  @Post()
  create(
    @Body() dto: CreateBookingDto,
    @CurrentUser() user?: JwtUserPayload,
  ): Promise<BookingResponseDto> {
    return this.bookingService.createBooking(dto, user?.sub);
  }

  @UseGuards(OptionalJwtGuard)
  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @CurrentUser() user?: JwtUserPayload) {
    return this.bookingService.cancelBooking(id, user?.sub);
  }

  @UseGuards(JwtGuard, AdminOrWorkerGuard)
  @Patch(':id/confirm')
  confirm(@Param('id') id: string) {
    return this.bookingService.confirmBooking(id);
  }
  @UseGuards(JwtGuard, AdminOrWorkerGuard)
  @Get()
  getAll() {
    return this.bookingService.getAll();
  }
}
