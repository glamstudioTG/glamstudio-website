import { Role } from '@prisma/client';

export type AuthUser = {
  sub: string;
  email: string;
  role: Role;
};
