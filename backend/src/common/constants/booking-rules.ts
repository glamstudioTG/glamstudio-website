import { BookingStatus } from '@prisma/client';
import { BOOKING_STATUS_TRANSITIONS } from './booking-transitions';

export function canTransition(
  from: BookingStatus,
  to: BookingStatus,
): boolean {
  return BOOKING_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}