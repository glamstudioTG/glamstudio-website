import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('/booking')

export class BookingController {

    constructor(private bookingService: BookingService) { }

    @Get()
    GetBookingsByDate() {
        return 'Bookings for the date'
    }

    @Get()
    GetPendingBookings() {
        return 'Pending bookings'
    }

    @Post('/create')
    createBooking(@Body() dto: CreateBookingDto) {
        return this.bookingService.createBooking(dto)
    }

    @Post('/:id/confirmation')
    uploadBookingConfirmation() {
        return 'Booking confirmation uploaded!'
    }

    @Patch('/:id/cancel')
    cancelBooking() {
        return 'Booking cancelled!'
    }

    @Patch('/:id/confirm')
    confirmBooking() {
        return 'Booking confirmed!'
    }


}