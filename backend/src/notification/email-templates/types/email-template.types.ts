export type BookingEmailContext = {
  bookingId: string;

  client: {
    name: string;
    email: string;
  };

  worker: {
    id: string;
    name: string;
    email: string;
  };

  services: string[];

  date: string; // YYYY-MM-DD
  startTime: number; // minutes
  endTime: number; // minutes
};
