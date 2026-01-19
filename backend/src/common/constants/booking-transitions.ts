import { BookingStatus } from '@prisma/client';

export const BOOKING_STATUS_TRANSITIONS: Record<
  BookingStatus,
  BookingStatus[]
> = {
  [BookingStatus.PENDING_PAYMENT]: [
    BookingStatus.PENDING_REVIEW,
    BookingStatus.CANCELLED,
  ],

  [BookingStatus.PENDING_REVIEW]: [
    BookingStatus.CONFIRMED,
    BookingStatus.CANCELLED,
  ],

  [BookingStatus.CONFIRMED]: [BookingStatus.COMPLETED, BookingStatus.CANCELLED],

  [BookingStatus.CANCELLED]: [],

  [BookingStatus.COMPLETED]: [],
};
