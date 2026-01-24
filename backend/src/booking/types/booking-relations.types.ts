import { Prisma } from '@prisma/client';

export type BookingWithRelations = Prisma.BookingGetPayload<{
  include: {
    worker: { include: { user: true } };
    service: { include: { service: true } };
    user: true;
  };
}>;
